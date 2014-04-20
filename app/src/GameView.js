	define(function(require, exports, module) {
    var Surface         = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform       = require('famous/core/Transform');
    var View            = require('famous/core/View');

    var height = 500;
    var width = 500;

    function GameView() {
        View.apply(this, arguments);
        _createGameView.call(this);
    };

    GameView.prototype = Object.create(View.prototype);
    GameView.prototype.constructor = GameView;

    GameView.DEFAULT_OPTIONS = {};

    function _createGameView() {
  		var backgroundSurface = new Surface({
  				size: [width, height],
          properties: {
              backgroundColor: 'rgb(176,176,176)',
              borderRadius: '5px'
          }
       });
  		this._add(backgroundSurface);
    }

    module.exports = GameView;
});