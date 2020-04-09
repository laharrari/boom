function Wall(theX, theY) {
    Entity.call(this, GAME_ENGINE, theX, theY);
    this.x = theX;
    this.y = theY;
    this.width = 48;
    this.height = 48;
    this.image = new Image();
    this.image.src = "./img/entities/wall.png";
    this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);
}

Wall.prototype.update = function () {
    if (this.boundingbox.collide(myPlayer.boundingbox)) {
        if (myPlayer.x > this.x) {
            myPlayer.x = this.x + this.width;
        }
        if (myPlayer.x < this.x) {
            myPlayer.x = this.x - myPlayer.width;
        }
        if (myPlayer.y > this.y) {
            myPlayer.y = this.y + this.height;
        }
        if (myPlayer.y < this.y) {
            myPlayer.y = this.y - myPlayer.height;
        }
    }
}

Wall.prototype.draw = function () {
    GAME_ENGINE.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    if (GAME_ENGINE.debug) {
        var gradient = GAME_ENGINE.ctx.createLinearGradient(0, 0, 170, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        GAME_ENGINE.ctx.strokeStyle = gradient;
        GAME_ENGINE.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
    }
}

