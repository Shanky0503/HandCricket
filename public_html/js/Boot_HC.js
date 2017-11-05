var HandCricket = HandCricket || {};

HandCricket.Boot = function () {
};

HandCricket.Boot.prototype = {
    preload: function () {
        //Load images in here.
//        this.load.image('loadingBar', 'Img/loadingBar.png');
        this.load.image('loadingBar', 'Img/loadingBarWhite.png');
        this.load.image('load_bg','Img/bg_splash_logo.png');
        this.load.image('littleMonkeyLogo','Img/littleMonkeyLogo.png');
    },
    create: function () {
     //   if (this.game.device.desktop) {
            this.game.stage.backgroundColor = "#000";
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.minWidth = 240;
            this.game.scale.minHeight = 135;
            this.game.scale.maxWidth = 1600;
            this.game.scale.maxHeight = 900;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            //this.game.scale.setScreenSize(true);


            this.state.start("Load");
       // }
    }
};