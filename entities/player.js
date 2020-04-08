function Player(theX, theY) {
    Entity.call(this, GAME_ENGINE, theX, theY);
    this.x = theX;
    this.y = theY;
    this.width = 48;
    this.height = 48;
    this.speed = 2;
    this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);
}

Player.prototype.update = function () {
    if (GAME_ENGINE.keyUp) {
        this.y -= this.speed;
    } else if (GAME_ENGINE.keyRight) {
        this.x += this.speed;
    } else if (GAME_ENGINE.keyDown) {
        this.y += this.speed;
    } else if (GAME_ENGINE.keyLeft) {
        this.x -= this.speed;
    }
    
    if (GAME_ENGINE.keySpace && GAME_ENGINE.spaceTimer === 0) {
        GAME_ENGINE.spaceTimer = 48;
        GAME_ENGINE.addEntity(new Balloon(this.x, this.y));
    }

    if (GAME_ENGINE.spaceTimer > 0) {
        GAME_ENGINE.spaceTimer--;
    }

    this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);
}

Player.prototype.draw = function () {
    GAME_ENGINE.ctx.fillStyle = "black";
    GAME_ENGINE.ctx.fillRect(this.x, this.y, this.width, this.height);
    if (GAME_ENGINE.debug) {
        GAME_ENGINE.ctx.strokeStyle = "blue";
        GAME_ENGINE.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
    }
}