

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();

    

    gameEngine.init(ctx);
    gameEngine.start();
});