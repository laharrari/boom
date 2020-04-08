function SpeedUp(theX, theY) {
    Entity.call(this, GAME_ENGINE, theX, theY);
    this.width = 48;
    this.height = 48;
    this.x = theX;
    this.y = theY;
    this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);
    this.image = new Image();
    this.image.src = "./img/entities/speedup.png";
}

SpeedUp.prototype.update = function () {
    this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);
    if (this.boundingbox.collide(myPlayer.boundingbox)) {
        myPlayer.speed += 1;
        this.removeFromWorld = true;
    }
}

SpeedUp.prototype.draw = function () {
    GAME_ENGINE.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    if (GAME_ENGINE.debug) {
        GAME_ENGINE.ctx.strokeStyle = "blue";
        GAME_ENGINE.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
    }
}



function BalloonPlus(theX, theY) {
    Entity.call(this, GAME_ENGINE, theX, theY);
    this.width = 48;
    this.height = 48;
    this.x = theX;
    this.y = theY;
    this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);
    this.image = new Image();
    this.image.src = "./img/entities/balloonplus.png";
}

BalloonPlus.prototype.update = function () {
    this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);
}

BalloonPlus.prototype.draw = function () {
    GAME_ENGINE.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    if (GAME_ENGINE.debug) {
        GAME_ENGINE.ctx.strokeStyle = "blue";
        GAME_ENGINE.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
    }
}



function BalloonPower(theX, theY) {
    Entity.call(this, GAME_ENGINE, theX, theY);
    this.width = 48;
    this.height = 48;
    this.x = theX;
    this.y = theY;
    this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);
    this.image = new Image();
    this.image.src = "./img/entities/balloonpower.png";
}

BalloonPower.prototype.update = function () {
    this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);
}

BalloonPower.prototype.draw = function () {
    GAME_ENGINE.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    if (GAME_ENGINE.debug) {
        GAME_ENGINE.ctx.strokeStyle = "blue";
        GAME_ENGINE.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
    }
}
