// This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

// CONSTANTS
var tile_size = 48;
var myPlayer;
const MAP_COMPONENTS_IDX = 0;
const PLAYER_IDX = 1;
const BALLOONS_IDX = 2;
const POWERUPS_IDX = 3;

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function GameEngine() {
    this.entities = [[], [], [], []];
    this.showOutlines = false;
    this.ctx = null;
    this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.debug = false;

    this.keyUp = false;
    this.keyLeft = false;
    this.keyRight = false;
    this.keyDown = false;
    this.keySpace = false;
    this.spaceTimer = 0;
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();
    this.timer = new Timer();
}

GameEngine.prototype.start = function () {
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();

    generateMap();
}

GameEngine.prototype.startInput = function () {
    var that = this;

    var getXandY = function (e) {
        var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
        var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

        return { x: x, y: y };
    }

    this.ctx.canvas.addEventListener("click", function (e) {
        console.log(getXandY(e));
        console.log({x: myPlayer.x, y: myPlayer.y});
        console.log(GAME_ENGINE.entities);
        that.click = getXandY(e);
    }, false);

    this.ctx.canvas.addEventListener("keydown", function (e) {
        e.preventDefault();

        if (e.code === "ArrowUp") {
            that.keyUp = true;
        } else if (e.code === "ArrowLeft") {
            that.keyLeft = true;
        } else if (e.code === "ArrowRight") {
            that.keyRight = true;
        } else if (e.code === "ArrowDown") {
            that.keyDown = true;
        } else if (e.code === "Space") {
            that.keySpace = true;
        }

        //toggle debug mode
        if (e.code === "KeyU") {
            if (that.debug === false) {
                that.debug = true;
            } else {
                that.debug = false;
            }
        }
    }, false);

    this.ctx.canvas.addEventListener("keyup", function (e) {
        if (e.code === "ArrowUp") {
            that.keyUp = false;
        } else if (e.code === "ArrowLeft") {
            that.keyLeft = false;
        } else if (e.code === "ArrowRight") {
            that.keyRight = false;
        } else if (e.code === "ArrowDown") {
            that.keyDown = false;
        } else if (e.code === "Space") {
            that.keySpace = false;
        }
    }, false);
}

GameEngine.prototype.addEntity = function (entity) {
    if (entity instanceof Player) {
        this.entities[PLAYER_IDX].push(entity);
    } else if (entity instanceof SpeedUp || entity instanceof BalloonPlus || entity instanceof BalloonPower) {
        this.entities[POWERUPS_IDX].push(entity);
    } else if (entity instanceof Balloon) {
        this.entities[BALLOONS_IDX].push(entity);
    } else {
        this.entities[MAP_COMPONENTS_IDX].push(entity);
    }
}

GameEngine.prototype.removeEntity = function (entity) {
    let idx;
    if (entity instanceof Player) {
        idx = this.entities[PLAYER_IDX].indexOf(entity);
        if (idx > -1) {
            this.entities[PLAYER_IDX].splice(idx, 1);
        }
    } else if (entity instanceof SpeedUp || entity instanceof BalloonPlus || entity instanceof BalloonPower) {
        idx = this.entities[POWERUPS_IDX].indexOf(entity);
        if (idx > -1) {
            this.entities[POWERUPS_IDX].splice(idx, 1);
        }
    } else if (entity instanceof Balloon) {
        idx = this.entities[BALLOONS_IDX].indexOf(entity);
        if (idx > -1) {
            this.entities[BALLOONS_IDX].splice(idx, 1);
        }
    } else {
        idx = this.entities[MAP_COMPONENTS_IDX].indexOf(entity);
        if (idx > -1) {
            this.entities[MAP_COMPONENTS_IDX].splice(idx, 1);
        }
    }
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    for (var i = this.entities.length - 1; i >= 0; i--) {
        for (var j = 0; j < this.entities[i].length; j++) {
            this.entities[i][j].draw(this.ctx);
        }
    }
    this.ctx.restore();
}

GameEngine.prototype.update = function () {

    for (var i = 0; i < this.entities.length; i++) {
        for (var j = 0; j < this.entities[i].length; j++) {
            var entity = this.entities[i][j];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }
    }

    for (var i = 0; i < this.entities.length; i++) {
        for (var j = 0; j < this.entities[i].length; j++) {
            var entity = this.entities[i][j];

            if (entity.removeFromWorld) {
                this.removeEntity(entity);
            }
        }
    }

}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
    this.click = null;
    this.rightclick = null;
    this.wheel = null;
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}