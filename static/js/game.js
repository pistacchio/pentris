// MAIN STATE
Game.Main = function (game) {
    this.backgroundData   = null;
    this.background       = null;
    this.plasmaBackground = null;
    this.pentominosData   = null;
    this.pentominos       = null;
    this.grid             = null;
    this.fallTimeElapsed  = null;
    this.speed            = 500;
    this.speedUp          = 0;
};

Game.Main.prototype = {
    preload: function () {
        this.game.time.advancedTiming = true;
    },
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // hide the real canvas and setup the scaled up one that will be visible
        // http://www.photonstorm.com/phaser/pixel-perfect-scaling-a-phaser-game
        if (RETRO_LOOK) {
            game.canvas.style['display'] = 'none';
            pixel.canvas = Phaser.Canvas.create(this, game.width * pixel.scale, game.height * pixel.scale);
            pixel.context = pixel.canvas.getContext('2d');
            Phaser.Canvas.addToDOM(pixel.canvas);
            Phaser.Canvas.setSmoothingEnabled(pixel.context, false);
            pixel.width = pixel.canvas.width;
            pixel.height = pixel.canvas.height;
        }

        // setup background plasma effect
        this.backgroundData = this.add.bitmapData(GRID_SIZE_W * GRID_CELL_SIZE / PLASMA_CELL_SIZE, GRID_SIZE_H * GRID_CELL_SIZE / PLASMA_CELL_SIZE);
        this.background = this.add.image(0, 0, this.backgroundData);
        this.plasmaBackground = new Game.PlasmaBackground(this.backgroundData);

        // setup the main grid with the falling pentomino
        this.pentominosData = this.add.bitmapData(GRID_SIZE_W * GRID_CELL_SIZE, GRID_SIZE_H * GRID_CELL_SIZE);
        this.pentominos = this.add.image(0, 0, this.pentominosData);
        this.pentominos.x = 0;
        this.pentominos.y = 0;
        this.grid = new Game.Grid(this.pentominosData, this);

        // used not to upgrade the falling pentomino each this.speed time
        this.fallTimeElapsed  = this.time.time;

        // setup input
        game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.grid.rotatePentomino.bind(this.grid), this);
        game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(this.grid.movePentomino.bind(this.grid, -1), this);
        game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(this.grid.movePentomino.bind(this.grid, 1), this);
        game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(function () { this.speedUp = this.speed / 1.2; }, this);
        game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onUp.add(function () { this.speedUp = 0; }, this);
        game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onUp.add(function () { Game.status = STATUS_FORCE_FALL, this.speedUp = this.speed * 2; }, this);
    },
    update: function () {
        this.plasmaBackground.update();

        // only update the falling pentomino once in a while (tetris style!)
        if (this.time.time - this.fallTimeElapsed >= this.speed - this.speedUp) {
            this.fallTimeElapsed = this.time.time;
            this.grid.update();
        }

        // remove complete lines
        this.grid.updateRemovingLines();
    },
    render: function () {
        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");

        // copy the canvas content to the scaled-up version
        if (RETRO_LOOK) pixel.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, pixel.width, pixel.height);
    }
};

// GAME SETUP
game.state.add('Main', Game.Main);
game.state.start('Main');