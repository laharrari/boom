class Player {
    constructor(theX, theY) {
        this.width = 48;
        this.height = 48;
        this.speed = 2;
        this.x = theX;
        this.y = theY;
        this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);
    }
    draw() {
        GAME_ENGINE.ctx.fillStyle = "black";
        GAME_ENGINE.ctx.fillRect(this.x, this.y, this.width, this.height);
        if (GAME_ENGINE.debug) {
            GAME_ENGINE.ctx.strokeStyle = "blue";
            GAME_ENGINE.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        }
    }
    update() {
        if (GAME_ENGINE.keyUp) {
            this.y -= this.speed;
        }
        else if (GAME_ENGINE.keyRight) {
            this.x += this.speed;
        }
        else if (GAME_ENGINE.keyDown) {
            this.y += this.speed;
        }
        else if (GAME_ENGINE.keyLeft) {
            this.x -= this.speed;
        }
        this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);
    }
}


