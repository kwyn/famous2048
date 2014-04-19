	define(function(require, exports, module) {
    var Surface         = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform       = require('famous/core/Transform');
    var View            = require('famous/core/View');



    function GameView() {
        View.apply(this, arguments);
        _createGameView.call(this);
    }

    GameView.prototype = Object.create(View.prototype);
    GameView.prototype.constructor = GameView;

    GameView.DEFAULT_OPTIONS = {};

    function _createGameView() {
    	var backgroundSurface = new Surface({
    		size:[true, true],
    		properties: {
    			backgroundSurface: 'black'
    		}
    	})
    }

    module.exports = GameView;
});