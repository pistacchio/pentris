var GAME_W               = 256,
    GAME_H               = 224,

    GRID_SIZE_W          = 10,
    GRID_SIZE_H          = 20,
    GRID_X               = 76,
    GRID_Y               = 10,
    GRID_CELL_SIZE       = 10,
    GRID_CELL_FALL_SPEED = 1,

    NEXT_PENTOMINO_X      = 13,
    NEXT_PENTOMINO_Y      = 105
    NEXT_PENTOMINO_WIDTH  = 50
    NEXT_PENTOMINO_HEIGHT = 60,

    PLASMA_CELL_SIZE     = 1,

    INITIAL_SPEED        = 500,

    STATUS_PLAYING        = 0,
    STATUS_REMOVING_LINES = 1,
    STATUS_FORCE_FALL     = 2,
    STATUS_COUNTDOWN      = 3,
    STATUS_GAMEOVER       = 4,

    STATUS_EXPLODING_START   = 0,
    STATUS_EXPLODING         = 1,
    STATUS_EXPLODING_FALLING = 3,

    TEXTS = {
        yellowredfontWidth:   6,
        yellowredfontHeight:  5,
        yellowredfontCharset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',

        scoreX: 202,
        scoreY: 32,

        scoreValueX:     190,
        scoreValueY:     45,
        scoreValueWidth: 50,

        topScoreX: 189,
        topScoreY: 93,

        topScoreValueX:     189,
        topScoreValueY:     105,
        topScoreValueWidth: 50,

        linesX: 25,
        linesY: 32,

        linesValueX:     15,
        linesValueY:     45,
        linesValueWidth: 50,
    },

    COUNTDOWN = {
        x:      125,
        y:      100,
        width:  27,
        height: 27,

        number3Rect: new Phaser.Rectangle(310, 0, 27, 27),
        number2Rect: new Phaser.Rectangle(283, 0, 27, 27),
        number1Rect: new Phaser.Rectangle(256, 0, 27, 27),

        duration:   1200,
        delay:      200,
        startDelay: 300,

        initialSize: 0.1,
        scaleFactor: 4
    },

    RETRO_LOOK = true,

    game = new Phaser.Game(GAME_W, GAME_H, Phaser.CANVAS, '', null, false, false),
    pixel = { scale: 2, canvas: null, context: null, width: 0, height: 0 },

    Game = {
        status: STATUS_PLAYING,
        start: function () {
            // GAME SETUP
            game.state.add('Main', Game.Main);
            game.state.add('Splash', Game.Splash);

            game.state.start('Splash');
        },
        assets: {
            images: {}
        }
    };
