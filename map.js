function wall(theX, theY) {
    this.x = theX;
    this.y = theY;
    this.width = 48;
    this.height = 48;

    this.image = new Image();
    this.image.src = "./wall.png";
    this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);
}

wall.prototype.update = function () {
    if (this.boundingbox.collide(myPlayer.boundingbox)) {
        if (myPlayer.x > this.x) {
            myPlayer.x += myPlayer.speed;
        }
        if (myPlayer.x < this.x) {
            myPlayer.x -= myPlayer.speed;
        }
        if (myPlayer.y > this.y) {
            myPlayer.y += myPlayer.speed;
        }
        if (myPlayer.y < this.y) {
            myPlayer.y -= myPlayer.speed;
        }
    }
}

wall.prototype.draw = function () {
    GAME_ENGINE.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    if (GAME_ENGINE.debug) {
        var gradient = GAME_ENGINE.ctx.createLinearGradient(0, 0, 170, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5" ,"blue");
        gradient.addColorStop("1.0", "red");

        GAME_ENGINE.ctx.strokeStyle = gradient;
        GAME_ENGINE.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y,
            this.boundingbox.width, this.boundingbox.height);
    }
}

function generateMap() {
    var map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            var x = tile_size * i;
            var y = tile_size * j;
            if (map[i][j] === 1) {
                GAME_ENGINE.addEntity(new wall(x, y));
            } else if (map[i][j] === 2) {
                myPlayer = new player(x, y);
                GAME_ENGINE.addEntity(myPlayer);
            }
        }
    }
}