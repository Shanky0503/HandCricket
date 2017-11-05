/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Phaser */

var HandCricket = HandCricket || {};

HandCricket.Load = function () {};

HandCricket.Load.prototype = 
{
preload : function ()
{   
    this.preLoadBG = this.add.sprite(0,0,'load_bg');
    this.preLoadLogo = this.add.sprite(this.world.centerX,450,'littleMonkeyLogo');
    this.preLoadLogo.anchor.set(0.5);
    this.preLoadLogo.scale.setTo(0.3);
    this.add.tween(this.preLoadLogo.scale).from({x:0.3, y:0},2000,Phaser.Easing.Elastic.Out,true);
    this.preloadBar = this.add.sprite(600, 650, 'loadingBar');
    this.preloadBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.preloadBar);        
    
    this.load.image('Finger00','Img/Finger00.png');
    this.load.image('Finger01','Img/Finger01.png');
    this.load.image('Finger02','Img/Finger02.png');
    this.load.image('Finger03','Img/Finger03.png');
    this.load.image('Finger04','Img/Finger04.png');
    this.load.image('Finger05','Img/Finger05.png');
    this.load.image('Finger06','Img/Finger06.png');
//    this.load.image('bg','Img/bg_img.png');
    this.load.image('outsign','Img/outsign.png');
    this.load.image('handcricket_main','Img/handcricket_main.png');
    this.load.image('handcricket_splash','Img/handcricket_splash.png');
    this.load.image('handcricket_logo','Img/handcricket_logo.png');
    this.load.image('handcricket_text','Img/handcricket_text.png');
    this.load.image('scoreboard','Img/scoreboard.png');
    this.load.image('instructions','Img/instructions.png');
    this.load.image('wicketscreen','Img/wicketscreen.png');
    this.load.image('century','Img/century.png');
    this.load.image('halfcentury','Img/halfcentury.png');    
    this.load.image('confetti','Img/confetti.png');    
    this.load.image('redscreen','Img/redscreen.png');    
    this.load.image('FBUserBackground','Img/FBUserBackground.png');
    this.load.image('Leaderboard','Img/Leaderboard_Bg-01.png');
    
    this.load.spritesheet('backButtonSprite','Img/backButtonSprite.png',100,100);    
    this.load.spritesheet('infoButtonSprite','Img/infoButtonSprite.png',100,100);    
    this.load.spritesheet('playButtonSprite','Img/playButtonSprite.png',100,100);    
    this.load.spritesheet('restartButtonSprite','Img/restartButtonSprite.png',100,100);    
    this.load.spritesheet('leaderboardSprite','Img/leaderboardSprite.png',100,100);    
//    this.load.spritesheet('finger000','Img/Finger000.png',200,200); 
    
    this.load.spritesheet('finger00_sprite','Img/finger00_sprite.png',200,200); 
    this.load.spritesheet('finger01_sprite','Img/finger01_sprite.png',200,200); 
    this.load.spritesheet('finger02_sprite','Img/finger02_sprite.png',200,200); 
    this.load.spritesheet('finger03_sprite','Img/finger03_sprite.png',200,200); 
    this.load.spritesheet('finger04_sprite','Img/finger04_sprite.png',200,200); 
    this.load.spritesheet('finger05_sprite','Img/finger05_sprite.png',200,200); 
    this.load.spritesheet('finger06_sprite','Img/finger06_sprite.png',200,200); 
    this.load.spritesheet('shareButton','Img/shareButton.png',100,100); 
    this.load.spritesheet('muteSprite','Img/muteSprite.png',100,100); 
    
    this.load.audio('bgm','audio/first_beat.mp3');
    this.load.audio('applause','audio/applause6.mp3');
    this.load.audio('cheer','audio/cheer.mp3');
    this.load.audio('groan','audio/crowd-groan.mp3');
    this.load.audio('click','audio/click.mp3');
    this.load.audio('smallapplause','audio/SmallApplause.mp3');
},
create: function ()  
    {
//        //this.game.stage.backgroundColor = "#000";
//        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//        this.scale.minWidth = 240;
//        this.scale.minHeight = 170;
//        this.scale.maxWidth = 1600;
//        this.scale.maxHeight = 900;
//        this.scale.pageAlignHorizontally = true;
//        //this.scale.setScreenSize(true); 
        this.state.start("Splash");        
   }    
};


