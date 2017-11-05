

/* global Phaser */

HandCricket = HandCricket || {};

HandCricket.LogoSplash = function () {};

HandCricket.LogoSplash.prototype = 
{  
    preload: function (){        
        
    },
    create: function ()  
    {        
        this.preLoadBG = this.add.sprite(0,0,'load_bg');
        this.preLoadLogo = this.add.sprite(this.world.centerX,450,'littleMonkeyLogo');
        this.preLoadLogo.anchor.set(0.5);
        this.preLoadLogo.scale.setTo(0.3);
        this.add.tween(this.preLoadLogo.scale).from({x:0, y:0},2000,Phaser.Easing.Elastic.Out,true);
        this.add.tween(this.preLoadLogo).to({alpha:1},1000,Phaser.Easing.Linear.None,true);
//        
        //this.add.sprite(600, 450, 'loadingBar');
        
        this.state.start("Load");  
    }    
    
    
};
