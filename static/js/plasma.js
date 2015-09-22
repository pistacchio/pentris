// old school plasma effect for the background. based off http://www.bidouille.org/prog/plasma
Game.PlasmaBackground = function (backgrounData) {
    this.MAGIC_NUM_1  = 16,
    this.MAGIC_NUM_2  = 30,
    this.COUNTER_STEP = 0.02,

    // this.PALETTE = ['ff004d', 'ffa300', 'ab5236', 'ffff27', '00e756', '008751', '29adff', '1d2b53', '83769c', '7e2553', 'ff77a8', 'ffccaa'],
    this.PALETTE = [ { r: 255, g: 0, b: 77, a: 255 },
                     { r: 255, g: 163, b: 0, a: 255 },
                     { r: 171, g: 82, b: 54, a: 255 },
                     { r: 255, g: 255, b: 39, a: 255 },
                     { r: 0, g: 231, b: 86, a: 255 },
                     { r: 0, g: 135, b: 81, a: 255 },
                     { r: 41, g: 173, b: 255, a: 255 },
                     { r: 29, g: 43, b: 83, a: 255 },
                     { r: 131, g: 118, b: 156, a: 255 },
                     { r: 126, g: 37, b: 83, a: 255 },
                     { r: 255, g: 119, b: 168, a: 255 },
                     { r: 255, g: 204, b: 170, a: 255 } ],

    this.backgroundData = backgrounData;
    this.globalCounter  = 0;
}

Game.PlasmaBackground.prototype = {
    update: function () {
        this.globalCounter += this.COUNTER_STEP;
        this.backgroundData.processPixelRGB(function (color, x, y) {
            x = Math.floor(x / PLASMA_CELL_SIZE);
            y = Math.floor(y / PLASMA_CELL_SIZE);

            var c1 = Math.sin(x / this.MAGIC_NUM_1 + this.globalCounter);
            var c3 = Math.sin(Phaser.Math.distance(x, y, Math.sin(-this.globalCounter) * this.MAGIC_NUM_2 + this.MAGIC_NUM_2, Math.cos(-this.globalCounter) * this.MAGIC_NUM_2 + this.MAGIC_NUM_2) / this.MAGIC_NUM_1);

            return this.PALETTE[Math.round(Utils.reRange( c1 + c3, -2, 2, 0, 11))];

            // FULL COLORS
            // c = c1 + c3;
            // c = Utils.reRange(c, -1, 1, 0, 255);
            // return {
            //     r: Utils.reRange(Math.sin(3.14 * c / 32), -1, 1, 0, 255),
            //     g: Utils.reRange(Math.sin(3.14 * c / 128), -1, 1, 0, 255),
            //     b: Utils.reRange(Math.sin(3.14 * c / 255), -1, 1, 0, 255),
            //     a: 255
            // };
        }, this);
    }
};