// MAIN STATE
Game.Main = function (game) {
    this.background     = null;
    this.miniBackground = null;

    this.backgroundCover = null;

    this.plasmaBackground = null;

    this.pentominos    = null;
    this.nextPentomino = null;

    this.grid = null;

    this.fallTimeElapsed = null;

    this.speed   = INITIAL_SPEED;
    this.speedUp = 0;

    this.score = 0;
    this.lines = 0;

    this.texts = {
        score:         null,
        scoreValue:    null,
        topScore:      null,
        topScoreValue: null,
        lines:         null,
        linesValue:    null
    }
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
        this.background = this.add.image(GRID_X, GRID_Y, this.add.bitmapData(GRID_SIZE_W * GRID_CELL_SIZE / PLASMA_CELL_SIZE, GRID_SIZE_H * GRID_CELL_SIZE / PLASMA_CELL_SIZE));
        this.plasmaBackground = new Game.PlasmaBackground(this.background.key);

        this.miniBackground     = this.add.image(7, 88, this.make.bitmapData(63, 84));

        // cover background image
        this.backgroundCover = this.add.image(0, 0, Game.assets.images.backgroundCoverData);

        // image to display the next pentomino that will fall
        this.nextPentomino = this.add.image(NEXT_PENTOMINO_X, NEXT_PENTOMINO_Y, this.add.bitmapData(NEXT_PENTOMINO_WIDTH, NEXT_PENTOMINO_HEIGHT));

        // setup the main grid with the falling pentomino
        this.pentominos = this.add.image(GRID_X, GRID_Y, this.add.bitmapData(GRID_SIZE_W * GRID_CELL_SIZE, GRID_SIZE_H * GRID_CELL_SIZE));
        this.grid = new Game.Grid(this);

        // ** texts **//
        // score
        this.texts.score      = this.add.retroFont('yellowredfont', TEXTS.yellowredfontWidth, TEXTS.yellowredfontHeight, TEXTS.yellowredfontCharset);
        this.texts.score.text = 'SCORE';
        this.add.image(TEXTS.scoreX, TEXTS.scoreY, this.texts.score);

        this.texts.scoreValue            = this.add.retroFont('yellowredfont', TEXTS.yellowredfontWidth, TEXTS.yellowredfontHeight, TEXTS.yellowredfontCharset);
        this.texts.scoreValue.align      = Phaser.RetroFont.ALIGN_CENTER;
        this.texts.scoreValue.fixedWidth = TEXTS.scoreValueWidth;
        this.texts.scoreValue.text       = '0';
        this.add.image(TEXTS.scoreValueX, TEXTS.scoreValueY, this.texts.scoreValue);

        // top score
        this.texts.topScore      = this.add.retroFont('yellowredfont', TEXTS.yellowredfontWidth, TEXTS.yellowredfontHeight, TEXTS.yellowredfontCharset);
        this.texts.topScore.text = 'TOP SCORE';
        this.add.image(TEXTS.topScoreX, TEXTS.topScoreY, this.texts.topScore);

        this.texts.topScoreValue            = this.add.retroFont('yellowredfont', TEXTS.yellowredfontWidth, TEXTS.yellowredfontHeight, TEXTS.yellowredfontCharset);
        this.texts.topScoreValue.align      = Phaser.RetroFont.ALIGN_CENTER;
        this.texts.topScoreValue.fixedWidth = TEXTS.topScoreValueWidth;
        if (window.localStorage !== undefined && localStorage.getItem('pentrisTopScore') !== null)
            this.texts.topScoreValue.text       = String(localStorage.getItem('pentrisTopScore'));
        else
            this.texts.topScoreValue.text       = '0';
        this.add.image(TEXTS.topScoreValueX, TEXTS.topScoreValueY, this.texts.topScoreValue);

        // completed lines
        this.texts.lines      = this.add.retroFont('yellowredfont', TEXTS.yellowredfontWidth, TEXTS.yellowredfontHeight, TEXTS.yellowredfontCharset);
        this.texts.lines.text = 'LINES';
        this.add.image(TEXTS.linesX, TEXTS.linesY, this.texts.lines);

        this.texts.linesValue            = this.add.retroFont('yellowredfont', TEXTS.yellowredfontWidth, TEXTS.yellowredfontHeight, TEXTS.yellowredfontCharset);
        this.texts.linesValue.align      = Phaser.RetroFont.ALIGN_CENTER;
        this.texts.linesValue.fixedWidth = TEXTS.linesValueWidth;
        this.texts.linesValue.text       = '0';
        this.add.image(TEXTS.linesValueX, TEXTS.linesValueY, this.texts.linesValue);


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

        this.miniBackground.key.copyRect(this.background.key, new Phaser.Rectangle(0, 0, 63, 84), 0, 0)

        // only update the falling pentomino once in a while (tetris style!)
        if (this.time.time - this.fallTimeElapsed >= this.speed - this.speedUp) {
            this.fallTimeElapsed = this.time.time;
            this.grid.update();
        }

        // remove complete lines
        this.grid.updateRemovingLines();

        // update texts
        this.texts.scoreValue.text = String(this.score);
        this.texts.linesValue.text = String(this.lines);
    },
    render: function () {
        // this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
        // this.game.debug.text(this.score || '--', 20, 14, "#00ff00");

        // copy the canvas content to the scaled-up version
        if (RETRO_LOOK) pixel.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, pixel.width, pixel.height);
    }
};