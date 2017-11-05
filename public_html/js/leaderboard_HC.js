
/* global Phaser */

HandCricket = HandCricket || {};

HandCricket.Leaderboard = function () {};

HandCricket.Leaderboard.prototype = 
{    
    preload : function ()
    {
      console.log("LeaderBoard");
      //this.add.sprite(0,0,'handcricket_splash');  
//      this.add.tileSprite(0,0,1600,900,'bg'); 
      this.add.sprite(0,0,'handcricket_splash');
      this.add.sprite(0,0,'Leaderboard');
      this.clicksfx = this.add.audio("click");
      this.bgm = this.add.audio('bgm');
      this.bgm.volume = 0.3;
      this.bgm.loop = true;
      this.bgm.play();
      this.clicksfx = this.add.audio("click");
    },
    
    create : function ()
    {                
        var playBtn = this.add.button(1450, 750, 'backButtonSprite', this.loadState, this, 2, 0, 1);
        this.add.tween(playBtn).from( { x: 1900 }, 2000, Phaser.Easing.Bounce.In, true);
        
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
        this.state.start("EndGame");         
    }
};


