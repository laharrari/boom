var MAP = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1],
    [1, 0, 1, 0, 3, 0, 1, 0, 1, 0, 3, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 4, 0, 2, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 3, 0, 1, 0, 1, 0, 3, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

function generateMap() {
    for (var i = 0; i < MAP.length; i++) {
        for (var j = 0; j < MAP[i].length; j++) {
            var y = tile_size * i;
            var x = tile_size * j;
            if (MAP[i][j] === 1) {
                GAME_ENGINE.addEntity(new Wall(x, y));
            } else if (MAP[i][j] === 2) {
                myPlayer = new Player(x, y);
                GAME_ENGINE.addEntity(myPlayer);
            } else if (MAP[i][j] === 3) {
                GAME_ENGINE.addEntity(new Crate(x, y));
            } else if (MAP[i][j] === 4) {
                GAME_ENGINE.addEntity(new SpeedUp(x, y));
            } else if (MAP[i][j] === 5) {
                GAME_ENGINE.addEntity(new BalloonPlus(x, y));
            } else if (MAP[i][j] === 6) {
                GAME_ENGINE.addEntity(new BalloonPower(x, y));
            }
        }
    }
}