
/* global Phaser, score, FB */

HandCricket = HandCricket || {};

HandCricket.EndGame = function () {};

HandCricket.EndGame.prototype = 
{    
    preload : function ()
    {
//        this.bgm = this.add.audio('bgm');
//        this.bgm.volume = 0.3;
//        this.bgm.loop = true;
//        this.bgm.play();
        this.clicksfx = this.add.audio("click");   
//        console.log("EndGame state"); 
        this.finalText = this.add.text(1100,470,"",{font:"160px Arial",align:"center", fill:"#ffffff"});
    },
    
    create : function ()
    {                
        var out = this.add.sprite(0,0,'outsign');    
        uiGroup = this.add.group();
        uiGroup.add(out);    
        isClickable = false;  
//        console.log(score);
//        console.log(this.game.score);
        this.finalScore(score);
//        console.log(topScore);
        var restartBtn = this.add.button(1450, 750, 'restartButtonSprite', this.restart, this, 2, 0, 1);
        var shareBtn = this.add.button(1350, 750, 'shareButton', this.shareFacebook, this, 2, 0, 1);    
//        var leaderboardBtn = this.add.button(1250, 750, 'leaderboardSprite', this.leaderBoard, this, 2, 0, 1);    
        
        /* make the API call */        
        var FBscore = score;
        var newTopScore;
        newTopScore = false;
        if (FBscore > topScore) {
//            console.log(FBscore + "is greater than  >  "+ topScore);
            newTopScore = true;
            topScore = FBscore;
            FB.login(function (response) {
                FB.api(
                        "/me/scores",
                        "POST",
                        {
                            "score": FBscore
                        }
                );
            }, {scope: 'publish_actions'});
        }
        
        var state = this;
        FB.api(
            "/" + FBAppID + "/scores",
            function (response) {
                if (response && !response.error) {
                    for (var i = 0; i < response.data.length && i < 5;i++) {
                        var user = new HandCricket.FBUser(state,response.data[i].user,response.data[i].score,i * 320 + 10, 840);
                    }
                } 
            }
        );        
         
    },      
       
  
    
    loadState : function ()
    {
        this.clicksfx.play();
        this.bgm.loop = false;
        this.bgm.stop();
        this.state.start("Load");         
    },
    
    leaderBoard : function ()
    {
        this.clicksfx.play();
        this.bgm.loop = false;
        this.bgm.stop();
//        console.log("loading leaderboard");
        this.state.start("Leaderboard");         
    },
    
//    restart : function ()
//    {
//        this.clicksfx.play();
//        this.game.bgm.loop = false;
//        this.game.bgm.stop();
//        this.finalsfx.stop();
//        this.state.start("Splash");
//        console.log("Restarting");
//        
//    },
//    
    restart : function ()
    {
        this.clicksfx.play();
        this.game.bgm.loop = false;
        this.game.bgm.stop();
        this.finalsfx.stop();
//        console.log("Restarting");
        this.state.start("Splash");

    },
    
    shareFacebook : function () {
//        console.log("sharing in facebook");
       FB.ui(
        {
         method: 'share',
         href: 'https://apps.facebook.com/1868391540101661'
        }, function(response){});        
    },
    
    confetti : function (num)
    {
        this.con = this.add.image(0,0,'confetti');
        if(num === 3)
        {
            this.add.tween(this.con).from({y:-100}, 2500, Phaser.Easing.Linear.None, true);
        }
        else
        {
            this.add.tween(this.con).from({y:-100}, 2500, Phaser.Easing.Linear.None, true);
            this.add.tween(this.con).to( { alpha: 0}, 2500, Phaser.Easing.Linear.None, true);
        }
    },
    
    finalScore : function (fScore)
    {   
        this.finalText.setText("  "+fScore);
        this.finalText.anchor.setTo(0.5);
        this.finalText.scale.setTo(0.1,0.1);
        this.add.tween(this.finalText.scale).to({x:1, y:1},1500,Phaser.Easing.Elastic.Out,true);
        this.confetti(3);            
        this.world.bringToTop(this.finalText);
        this.finalsfx = this.add.audio('smallapplause');
        this.finalsfx.play();
    }
};


