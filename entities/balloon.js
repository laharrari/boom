function Balloon(theX, theY) {
    theX = (Math.round(theX / 48)) * 48;
    theY = (Math.round(theY / 48)) * 48;
    Entity.call(this, GAME_ENGINE, theX, theY);
    this.x = theX;
    this.y = theY;
    this.width = 48;
    this.height = 48;

    this.timer = 200;

    this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);
}

Balloon.prototype.update = function () {
    if (this.timer === 0) {
        var count = 1;
        var size = 1;

        while (count <= size) {
            GAME_ENGINE.addEntity(new Splash(this.x + (count * 48), this.y));
            GAME_ENGINE.addEntity(new Splash(this.x - (count * 48), this.y));
            GAME_ENGINE.addEntity(new Splash(this.x, this.y + (count * 48)));
            GAME_ENGINE.addEntity(new Splash(this.x, this.y - (count * 48)));
            count++;
        }
        this.removeFromWorld = true;
    }
    
    this.timer--;
}

Balloon.prototype.draw = function () {
    GAME_ENGINE.ctx.fillStyle = "blue";
    GAME_ENGINE.ctx.fillRect(this.x, this.y, this.width, this.height);
    if (GAME_ENGINE.debug) {
        GAME_ENGINE.ctx.strokeStyle = "pink";
        GAME_ENGINE.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
    }
}