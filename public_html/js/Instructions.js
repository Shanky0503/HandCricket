
/* global Phaser */

HandCricket = HandCricket || {};

HandCricket.Instructions = function () {};

HandCricket.Instructions.prototype = 
{    
    preload : function ()
    {
      //this.add.sprite(0,0,'handcricket_splash');  
      this.add.sprite(0,0,'instructions');
      this.clicksfx = this.add.audio("click");      
    },
    
    create : function ()
    {                
        var playBtn = this.add.button(1450, 750, 'backButtonSprite', this.loadState, this, 2, 0, 1);
        this.add.tween(playBtn).from( { x: 1900 }, 2000, Phaser.Easing.Bounce.In, true);
    },  
    
    loadState : function ()
    {
        this.clicksfx.play();       
        this.state.start("Load");         
    }
};


