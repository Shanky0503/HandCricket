/* global Phaser, FB */

var HandCricket = HandCricket || {};
var userImages = [];
HandCricket.FBUser = function (state, user, score, x, y) {
//    console.log("Running FB User");
    this.user = user;
    this._x = x;
    this._y = y;
    this.state = state;
    this.score = score;
    this.textStyle = {font: "20px 'Arial'", fill: "#fff", stroke: "white", strokeThickness: 1, boundsAlignH: "center", boundsAlignV: "middle"};
    Phaser.Group.call(this, state.game);
    this.background = this.create(x, y, 'FBUserBackground');
    var group = this;    
    FB.api(
            "/" + user.id + "/picture?width=50&height=50",
            function (response) {
                //console.log();
                if (response && !response.error) {
                    //console.log("getting the picture");
                    var loader = new Phaser.Loader(state.game);
                    loader.crossOrigin = "anonymous";

                    if (response.data.url) {
//                        var image = state.game.cache.getImage(user.id);
                        if (userImages.indexOf(user.id) > -1) {                            
                                group.create(x + 5, y + 5, user.id);                            
//                                console.log("Creating Image");
                        }   
                        else {
                            loader.image(user.id, response.data.url);                       
                            loader.onLoadComplete.add(function () {
                                group.create(x + 5, y + 5, user.id); 
//                                console.log("pushing Array");
                                userImages.push(user.id);
                            });
                            loader.start();
                        }
//                        console.log(userImages);
//                        loader.image(user.id, response.data.url);                       
//                        loader.onLoadComplete.add(function () {
//                            group.create(x + 5, y + 5, user.id);                            
//                        });
//                        loader.start();
                    }
                }
            }
    );
    
//    var images = this.game.cache.getKeys(Phaser.Cache.IMAGE);
//    console.log(images);
    var nameLabel = state.game.add.text(x + 60, y + 5, user.name, this.textSyle, this);
    //console.log(nameLabel);

    var scoreLabel = state.game.add.text(x + 60, y + 30, score, this.textSyle, this);
    //console.log(scoreLabel);
    state.game.add.existing(this);
},
        
HandCricket.FBUser.prototype = Object.create(Phaser.Group.prototype);
HandCricket.FBUser.prototype.constructor = HandCricket.FBUser;


