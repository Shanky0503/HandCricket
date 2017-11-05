/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global Phaser */

var HandCricket = HandCricket || {};

HandCricket.game = new Phaser.Game({width: 1600, height: 900, renderType: Phaser.AUTO, parent:''});

//TODO: Add game states in here
HandCricket.game.state.add('Load', HandCricket.Load);
HandCricket.game.state.add('Play', HandCricket.Play);
HandCricket.game.state.add('Boot', HandCricket.Boot);
HandCricket.game.state.add('LogoSplash', HandCricket.LogoSplash);
HandCricket.game.state.add('Splash', HandCricket.Splash);
HandCricket.game.state.add('Instructions', HandCricket.Instructions);
HandCricket.game.state.add('Leaderboard', HandCricket.Leaderboard);
HandCricket.game.state.add('EndGame', HandCricket.EndGame);
HandCricket.game.state.add('Pause', HandCricket.Instructions);
HandCricket.game.state.start("Boot");


var topScore = 0;

