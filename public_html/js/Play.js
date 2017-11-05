/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Phaser, fin, FB, FBAppID */
//var fingers = [];
//var group;
var score;

HandCricket = HandCricket || {};

HandCricket.Play = function () {};

HandCricket.Play.prototype = 
{
    // Creating buttons and aligning them
preload : function ()
{
    this.clicksfx = this.add.audio("click");        
},

create: function () 
{   
    this.isClickable = true;
//    console.log("Entering Play state..");    
    this.add.tileSprite(0,0,1600,900,'bg');    
    this.group = this.add.group();
    this.group.visible = true;
    this.fingers = [];
    score = 0;
    this.noOfWickets =1;
    this.wickets = 0;
    this.halfCentury = false;
    this.century = false;
    this.uiPressed = false;
    this.onceClicked = false;
    //this.oneFifty = false;
    //this.twoHundred = false;
    //this.twoFifty = false;
    //this.threeHundred = false;
    //this.wicketDisplay = false;
    for (var i = 0; i < 7; i++) 
    {
        var fin = this.add.sprite(1300,1900,'finger0'+i+'_sprite',2);
        if(i > 0)
        {    
            fin.alignTo(this.fingers[i -1],Phaser.RIGHT_CENTER,16);                
        }
        this.group.add(fin);            
        this.fingers[i] = fin;
        this.group.add(this.fingers[i]);
        this.group.scale.setTo(0.4,0.4);            
        fin.inputEnabled = true;
        fin.input.bringToTop = false;
        fin.input.useHandCursor = true;
        fin.num = i;
        fin.state = this;
        fin.events.onInputOver.add(function ()
        {
           this.state.hover(this.num);       
        },fin);
        
        fin.events.onInputOut.add(function ()
        {
           this.state.out(this.num);       
        },fin);
        
        fin.events.onInputDown.add(function()
        {
            this.state.listener(this.num);            
        },fin);     
    } 
   
    this.scoreText = this.add.text(270,97,"0",{font:"35px Arial",align:"center",fill:"#ffffff"});
    this.finalText = this.add.text(1100,470,"",{font:"160px Arial",align:"center", fill:"#ffffff"});
    this.wicketText = this.add.text(270,157,"0/3",{font:"35px Arial",align:"center",fill:"#ffffff"});
    this.scoreboard = this.add.sprite(50,50,'scoreboard');
    this.scoreboard.scale.setTo(0.5,0.5);
    this.pauseBtn = this.add.button(1450, 50, 'restartButtonSprite', this.restart, this,2, 0, 1);
    this.volumeBtn = this.add.button(1350, 50, 'muteSprite', this.mute, this);
    
    
    this.uPic = this.add.image(800,550);    
    this.uPic.anchor.setTo(0.5,0.5);    
    this.uPic.scale.x = 0;
    this.uPic.scale.y = 1;
    this.uPic.visible = false;
    
    this.aiPic = this.add.image(800,175);
    this.aiPic.anchor.setTo(0.5,0.5);
    this.aiPic.scale.x = 0;
    this.aiPic.scale.y = 1;
    this.aiPic.visible = false;   
},

listener: function (userNum)
{    
    //console.log("You clicked: "+ userNum);
    this.uiPressed = true;
    this.onceClicked = true;
    this.clicked(userNum);
    this.clicksound();
    var r = this.randomNumber();
    var u = userNum;
    this.aiDisplay(r);
    this.userDisplay(u);
    this.scoreUpdate(u);
    this.numberChecker(u,r);        
},
hover : function (nu)
{
    this.fingers[nu].loadTexture('finger0'+nu+'_sprite',1);  
},

out : function (nu)
{
    this.fingers[nu].loadTexture('finger0'+nu+'_sprite',2);  
},

clicked : function (nu)
{
    this.fingers[nu].loadTexture('finger0'+nu+'_sprite',0);  
},

mute : function ()
{
    if (this.game.sound.mute)
        {
//            this.game.bgm.resume();
//            this.clicksfx.play();
            this.game.sound.mute = false;
            this.volumeBtn.loadTexture('muteSprite',0);
        }
        else
        {
//            this.game.bgm.pause();
//            this.clicksfx.stop();
            this.game.sound.mute = true;
            this.volumeBtn.loadTexture('muteSprite',1);
        }
},

numberChecker: function ( rNum, uNum)
{
    //console.log("Number Checking : "+ rNum+" & "+uNum);
    if (rNum === uNum) 
    {
       //console.log("you're Out");
       this.wicketUpdater();
    }
},

/**
 * Generating a random number from 0 to 7
 */
randomNumber: function ()
{
    var randNum = Math.floor((Math.random() * 7));
    return  randNum;    
},

// Displaying AI Number 
aiDisplay: function (aiNum)
{
    this.ImageActive = true;
    this.aiPic.visible = true;
    this.aiPic.loadTexture('Finger0'+aiNum);
    this.aiPic.scale.x = 0;
    this.aiPic.scale.y = 1;
    this.add.tween(this.aiPic.scale).to({x:1, y:1},1500,Phaser.Easing.Elastic.Out,true);
},

// Displaying User Number
userDisplay: function (userNum)
{
    this.uPic.visible = true;
    this.uPic.loadTexture('Finger0'+userNum);
    this.uPic.scale.x = 0;
    this.uPic.scale.y = 1;
    this.add.tween(this.uPic.scale).to({x:1, y:1},1500,Phaser.Easing.Elastic.Out,true);
},

// Ending the game 

endGame : function ()
{
    this.state.start("EndGame");
},
// Updating score and Displaying it in game

scoreUpdate : function (scorein)
{
   score = score + scorein;
   this.scoreText.bringToTop();
   this.scoreText.setText(" "+ score);
   this.scoreText.anchor.setTo(0.5);
   this.scoreText.scale.x = 0.2;
   this.scoreText.scale.y = 0.2;
   this.add.tween(this.scoreText.scale).to({x:1, y:1},1500,Phaser.Easing.Elastic.Out,true);   
   //console.log("The Score is :"+score);
   this.scoreChecker(score);
},

// Displaying the final score at the end
//finalScore : function (fScore)
//{   
//    this.finalText.setText("  "+fScore);
//    this.finalText.anchor.setTo(0.5);
//    this.finalText.scale.setTo(0.1,0.1);
//    this.add.tween(this.finalText.scale).to({x:1, y:1},1500,Phaser.Easing.Elastic.Out,true);
//    this.confetti(3);            
//    this.world.bringToTop(this.finalText);
//    this.finalsfx = this.add.audio('smallapplause');
//    this.finalsfx.play();
//},

//shareFacebook : function () {
////        console.log("sharing in facebook");
//       FB.ui(
//        {
//         method: 'share',
//         href: 'https://apps.facebook.com/1868391540101661'
//        }, function(response){});        
//},


// Restarting the whole game

restart : function ()
{
    this.clicksound();
    this.game.bgm.loop = false;
    this.game.bgm.stop();
    this.state.start("Splash");
   
},

// Updates the no.of Wickets

wicketUpdater: function ()
{
    this.wicketText.bringToTop();
    if (this.wickets === undefined) 
    {
       this.wickets = 0;
    }
    if (this.wickets <= this.noOfWickets)
    {
        this.wickets ++;
        this.wicketText.anchor.setTo(0.5);
        this.wicketText.scale.setTo(0.1);
        this.wicketText.setText(" "+this.wickets+"/ "+this.noOfWickets);
        this.add.tween(this.wicketText.scale).to({x:1, y:1},1500,Phaser.Easing.Elastic.Out,true);        
    } 
    if(this.wickets <= this.noOfWickets-1)
    {
        //console.log("Displaying Screen...");
        this.wicketScreen();
    }
    //console.log("No of Wickets : "+this.wickets);    
    this.wicketsChecker(this.wickets);
},

// Checking the number of wickets is less than the total wickets 

wicketsChecker : function (noWickets)
{
    
    if (noWickets >= this.noOfWickets) 
    {
//        console.log("No of wickets : "+ noWickets);
//        console.log("No of wickets remaining : "+ this.noOfWickets);
        this.endGame();            
    }
},

wicketScreen : function ()
{
    var redscreen = this.add.sprite(0,0,'redscreen');
    var wicScreen = this.add.sprite(0,0,'wicketscreen');
    this.timeDelay(wicScreen);
    this.wicketDisplay = true;
    wicScreen.scale.x = 1;
    wicScreen.scale.y = 0;
    this.add.tween(wicScreen.scale).to({x:1, y:1},1500,Phaser.Easing.Elastic.Out,true);
    redscreen.alpha = 0;
    this.groan = this.add.audio('groan');
    this.groan.play();
    this.fadein = this.add.tween(redscreen).to( { alpha: .5 }, 1500, Phaser.Easing.Linear.None, true);
    this.fadein.yoyo(true);
},

// checking for achivements

scoreChecker : function (sco)
{
    //console.log("Checking achivements :0");
    if (sco >= 50 && !this.halfCentury) 
    {   
    //console.log("Half Century .....");
    this.halfCentury = true;
    this.halfCenturyScreen();
    }
    else if(sco >= 100 && !this.century)
    {
    //console.log("Century ........."); 
    this.century = true;
    this.centuryScreen();
    }    
},

halfCenturyScreen : function ()
{
    var halfCenScreen = this.add.sprite(0,0,'halfcentury');
    this.timeDelay(halfCenScreen);
    this.cheer = this.add.audio('cheer');
    this.cheer.play();
    this.confetti();
},

centuryScreen : function ()
{
    var cenScreen = this.add.sprite(0,0,'century');
    this.timeDelay(cenScreen);
    this.cheer.play();
    this.confetti();
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

timeDelay : function (pic)
{
    //console.log(" Delaying time .."); 
    this.disableInput();
    this.time.events.add(Phaser.Timer.SECOND * 2, function() { this.add.tween(pic).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
    this.time.events.add(Phaser.Timer.SECOND * 2,this.setInput,this);
},

setInput : function ()
{
    this.group.visible = true;
    this.group.inputEnableChildren = true;
},

disableInput : function ()

{
    this.group.visible = false;
    this.group.inputEnableChildren = false;
},

loadState : function ()
{
    this.state.start("Load");
},

uiDisable : function ()
{    
    for (var i = 0; i < 7; i++) 
    {
       this.fingers[i].inputEnabled = false;
    }
},

uiEnable : function ()
{
    //group.fin.inputEnabled = true;
    //group.input.useHandCursor = true;
    //console.log("Enabling Ui buttons");
    for (var i = 0; i < 7; i++) 
    {
       this.fingers[i].inputEnabled = true;
       this.fingers[i].input.useHandCursor = true;       
    }
    
},

clicksound : function ()
{
    
    //console.log("Click Sound playing..");
    this.clicksfx.play();
},

update : function ()
{
    if (this.isClickable === false) 
    {
       this.group.inputEnableChildren = false;
       this.group.visible = false;
       this.isClickable = true;
    }
      //console.log(this.uiPressed);
   if(this.uiPressed === true)
    {
        //console.log("Ui button Pressed...");
        
        this.uiDisable();
        this.time.events.add(Phaser.Timer.SECOND * 1,this.uiEnable,this);
        //console.log(this.uiPressed);
        this.uiPressed = false;
        //this.clearImages();
    }   
}
};