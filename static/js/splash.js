// SPLASH SCREEN STATE
Game.Splash = function (game) {
};

Game.Splash.prototype = {
    preload: function () {
        var self = this;

        // load the main game when all assets are loaded
        this.load.onLoadComplete.add(function () {
            Game.assets.images.backgroundCoverData = self.add.bitmapData(GAME_W, GAME_H, 'background-cover', true);
            Game.assets.images.backgroundCoverData.copyRect('images', new Phaser.Rectangle(0, 0, GAME_W, GAME_H), 0, 0);

            // Game.assets.images.retroFontData = self.add.bitmapData(215, 5, 'yellow-retro-font', true);
            // Game.assets.images.retroFontData.copyRect('images', new Phaser.Rectangle(GAME_W, 0, 215, 5), 0, 0);

            // var retroFontData = self.make.bitmapData(215, 5);
            // retroFontData.copyRect('yellowredfontIMAGE', new Phaser.Rectangle(0, 0, 215, 5), 0, 0);
            // self.add.image(0, 0, retroFontData);
            // Game.assets.images.retroFontImage = self.make.image(0, 0, retroFontData);
            // debugger;
            // this.game.cache.addImage('yellowredfont', Game.assets.images.retroFontImage);

            self.game.state.start('Main');
        }, this);

        this.load.image('images', 'static/img/images.png');
        this.load.image('yellowredfont', 'static/img/textfont.png');
    },
    create: function () {
    },
    render: function () {

        // copy the canvas content to the scaled-up version
        if (RETRO_LOOK) pixel.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, pixel.width, pixel.height);
    },
}

