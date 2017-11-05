/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global score, Phaser */

HandCricket = HandCricket || {};

HandCricket.Pause = function () {};

HandCricket.Pause.prototype = 
{    
    preload : function ()
    {        
        console.log("Paused the Game");
    },
    
    create : function ()
    {
        this.paused = true;
    }    
    
};



