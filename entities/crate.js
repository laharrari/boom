class Crate {
    constructor(theX, theY) {
        this.x = theX;
        this.y = theY;
        this.width = 48;
        this.height = 48;
        this.image = new Image();
        this.image.src = "./img/entities/wall.png";
        this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);

        // MAJOR KEY ALERT!!!
        // THIS FIELD MUST BE IN ANY ENTITY THAT IS TO BE REMOVED LATER ONE BY GAME_ENGINE
        this.removeFromWorld = false;
    }
    update() {
        if (this.boundingbox.collide(myPlayer.boundingbox)) {
            this.removeFromWorld = true;
        }
    }
    draw() {
        GAME_ENGINE.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        if (GAME_ENGINE.debug) {
            GAME_ENGINE.ctx.strokeStyle = "green";
            GAME_ENGINE.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        }
    }
}