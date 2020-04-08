function Splash(theX, theY) {
    Entity.call(this, GAME_ENGINE, theX, theY);
    this.x = theX;
    this.y = theY;
    this.width = 48;
    this.height = 48;

    this.timer = 100;

    this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);
}

Splash.prototype.update = function () {
    if (this.timer === 0) {
        this.removeFromWorld = true;
    }

    this.timer--;
}

Splash.prototype.draw = function () {
    GAME_ENGINE.ctx.fillStyle = "green";
    GAME_ENGINE.ctx.fillRect(this.x, this.y, this.width, this.height);
    if (GAME_ENGINE.debug) {
        GAME_ENGINE.ctx.strokeStyle = "pink";
        GAME_ENGINE.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
    }
}