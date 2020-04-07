function Crate(theX, theY) {
    Entity.call(this, GAME_ENGINE, theX, theY);
    this.x = theX;
    this.y = theY;
    this.width = 48;
    this.height = 48;
    this.image = new Image();
    this.image.src = "./img/entities/wall.png";
    this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);
}

Crate.prototype.update = function () {
    if (this.boundingbox.collide(myPlayer.boundingbox)) {
        this.removeFromWorld = true;
    }
}

Crate.prototype.draw = function () {
    GAME_ENGINE.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    if (GAME_ENGINE.debug) {
        GAME_ENGINE.ctx.strokeStyle = "green";
        GAME_ENGINE.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
    }
}