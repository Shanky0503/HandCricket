/* global Phaser, EZGUI, FBAppID, FB */

HandCricket = HandCricket || {};

HandCricket.Splash = function () {};

HandCricket.Splash.prototype = 
{    
    preload : function ()
    {   
        //console.log("Splash Screen ");
        this.add.sprite(0,0,'handcricket_splash');
        this.logo = this.add.sprite(this.world.centerX,250,'handcricket_logo');
        this.logotext = this.add.sprite(this.world.centerX,650,'handcricket_text');
        this.logo.anchor.setTo(0.5);
        this.add.tween(this.logo).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
        this.logotext.anchor.setTo(0.5);
        this.logotext.alpha = 0;
        this.logotext.scale.x = 0.1;
        this.logotext.scale.y = 0.1;
        this.add.tween(this.logotext.scale).to({x:1, y:1},2000,Phaser.Easing.Elastic.Out,true);
        this.add.tween(this.logotext).to({alpha:1},1000,Phaser.Easing.Linear.None,true);
        
        //this.bgm.play();

        this.clicksfx = this.add.audio("click");
        this.game.bgm = this.add.audio('bgm');
        this.game.bgm.volume = 0.3;
        this.game.bgm.loop = true;
        this.game.bgm.play();
        
    },
    
    create : function ()
    {    
        var playBtn = this.add.button(1425, 750, 'playButtonSprite', this.playState, this, 2, 0, 1);
        this.add.tween(playBtn).from( { x: 1900 }, 2000, Phaser.Easing.Bounce.In, true);
        var infoBtn = this.add.button(1325, 750, 'infoButtonSprite', this.infoState, this, 2, 0, 1);
        this.infoTween = this.add.tween(infoBtn).from( { x: 1900 }, 2000, Phaser.Easing.Bounce.In, true);
        //var volumeBtn = this.add.button(1225, 750, 'muteSprite', this.mute, this);
        //this.add.tween(volumeBtn).from( { x: 1900 }, 2000, Phaser.Easing.Bounce.In, true);        
        
//        console.log("after creating buttons !!!!");
        this.infoTween.onComplete.add((function (){
            var state = this;
            FB.login(function (response) {
                if (response !== null && !response.error) {
                    var owner;             
                    FB.api(
                        "/" + FBAppID + "/scores",
                        function (response) {
    //                            console.log(response);
                            if (response && !response.error) {
                                for (var i = 0; i < response.data.length && i < 5;i++) {                                    
                                    var user = new HandCricket.FBUser(state,response.data[i].user,response.data[i].score,i * 320 + 10, 840);
                                }
                            } 
                        }
                    );
                }
            }, {scope: "user_friends"});
        }),this);
        
    }, 
    
    playState : function ()
    {
        this.clicksfx.play();
        this.state.start("Play");         
    },    
    mute : function (){
        
    if (this.bgm.paused)
        {
            this.bgm.resume();
            this.volumeBtn.loadTexture('muteSprite',0);
        }
        else
        {
            this.bgm.pause();
            this.volumeBtn.loadTexture('muteSprite',1);
        }
    },
    
    infoState : function ()
    {
        this.clicksfx.play();
        this.state.start("Instructions");         
    }
   
};



