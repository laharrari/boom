// CONSTANTS
const AM = new AssetManager();
const GAME_ENGINE = new GameEngine();

function player(theX, theY) {
    this.width = 48;
    this.height = 48;
    this.speed = 2;
    this.x = theX;
    this.y = theY;
    this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);
}

player.prototype.draw = function() {
    GAME_ENGINE.ctx.fillStyle = "black";
    GAME_ENGINE.ctx.fillRect(this.x, this.y, this.width, this.height);

    if (GAME_ENGINE.debug) {
        GAME_ENGINE.ctx.strokeStyle = "blue";
        GAME_ENGINE.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y,
            this.boundingbox.width, this.boundingbox.height);
    }
}

player.prototype.update = function() {
    if (GAME_ENGINE.keyUp) {
        this.y -= this.speed;
    } else if (GAME_ENGINE.keyRight) {
        this.x += this.speed;
    } else if (GAME_ENGINE.keyDown) {
        this.y += this.speed;
    } else if (GAME_ENGINE.keyLeft) {
        this.x -= this.speed;
    }

    this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);
}

function BoundingBox(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.left = x;
    this.top = y;
    this.right = this.left + width;
    this.bottom = this.top + height;
}

BoundingBox.prototype.collide = function (oth) {
    if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) return true;
    return false;
}

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    GAME_ENGINE.init(ctx);
    GAME_ENGINE.start();
});