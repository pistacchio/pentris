var GAME_W               = 150,
    GAME_H               = 200,
    GRID_SIZE_W          = 10,
    GRID_SIZE_H          = 20,
    GRID_CELL_SIZE       = 8,
    GRID_CELL_FALL_SPEED = 1,
    PLASMA_CELL_SIZE     = 1,

    STATUS_PLAYING        = 0,
    STATUS_REMOVING_LINES = 1,
    STATUS_FORCE_FALL     = 2,

    STATUS_EXPLODING_START   = 0,
    STATUS_EXPLODING         = 1,
    STATUS_EXPLODING_FALLING = 3,

    RETRO_LOOK = true,

    game = new Phaser.Game(GAME_W, GAME_H, Phaser.CANVAS, '', null, false, false),
    pixel = { scale: 4, canvas: null, context: null, width: 0, height: 0 },

    Game = {
        status: STATUS_PLAYING
    };
