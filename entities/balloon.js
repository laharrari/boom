function Balloon(theX, theY) {
    Entity.call(this, GAME_ENGINE, theX, theY);
    this.x = (Math.round(theX / 48)) * 48;
    this.y = (Math.round(theY / 48)) * 48;
    this.width = 48;
    this.height = 48;

    this.timer = 200;

    this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);
}

Balloon.prototype.update = function () {
    if (this.timer === 0) {
        this.removeFromWorld = true;
    }

    this.timer--;
}

Balloon.prototype.draw = function () {
    GAME_ENGINE.ctx.fillStyle = "blue";
    GAME_ENGINE.ctx.fillRect(this.x, this.y, this.width, this.height);
    if (GAME_ENGINE.debug) {
        GAME_ENGINE.ctx.strokeStyle = "blue";
        GAME_ENGINE.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
    }
}