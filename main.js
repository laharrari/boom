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

//
Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
        this.animationDone = true;
    } else {
        this.animationDone = false;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);
    this.drawFrameHelper(ctx, x, y, xindex * this.frameWidth, yindex * this.frameHeight);
}

Animation.prototype.drawFrameAniThenIdle = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    var xindex = 0;
    var yindex = 0;
    if (this.isDone()) {
        xindex = this.frames % this.sheetWidth;
        yindex = Math.floor(this.frames / this.sheetWidth) - 1;
    } else {
        var frame = this.currentFrame();
        xindex = frame % this.sheetWidth;
        yindex = Math.floor(frame / this.sheetWidth);
    }
    this.drawFrameHelper(ctx, x, y, xindex * this.frameWidth, yindex * this.frameHeight);
}

Animation.prototype.drawFrameIdle = function (ctx, x, y) {
    this.drawFrameHelper(ctx, x, y, 0, 0);
}

Animation.prototype.drawFrameHelper = function (ctx, x, y, xFrame, yFrame) {
    var xPosition;
    if ((x >= 0 && CAMERA.x >= 0) || (x < 0 && CAMERA.x < 0)) {
        xPosition = x - CAMERA.x;
    } else {
        xPosition = x + CAMERA.x;
    }
    ctx.drawImage(this.spriteSheet,
        xFrame, yFrame,
        this.frameWidth, this.frameHeight,
        xPosition, y - CAMERA.y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    GAME_ENGINE.init(ctx);
    GAME_ENGINE.start();
});