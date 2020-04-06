// CONSTANTS
const AM = new AssetManager();
const GAME_ENGINE = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    GAME_ENGINE.init(ctx);
    GAME_ENGINE.start();
});