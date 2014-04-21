	define(function(require, exports, module) {
    var Surface         = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform       = require('famous/core/Transform');
    var View            = require('famous/core/View');
    var TileView        = require('src/TileView');
    var Easing          = require('famous/transitions/Easing');
    var Timer           = require('famous/utilities/Timer');

    var controller      = require('src/controller');

    var height = 500;
    var width = 500;

    function GameView() {
        View.apply(this, arguments);
        _createGameSurface.call(this);
        _createTiles.call(this);
        _coords.call(this);
        _animateTilesIn.call(this);
    };

    GameView.prototype = Object.create(View.prototype);
    GameView.prototype.constructor = GameView;

    GameView.DEFAULT_OPTIONS = {};

    function _createGameSurface() {
  		this.backgroundSurface = new Surface({
  				size: [width, height],
          properties: {
            border: '1px solid grey'
          }
       });
      this.backgroundSurface.pipe(this._eventOutput);

  		this._add(this.backgroundSurface);
    };

    function _createTiles(){
      console.log(this);
      this.tileModifiers = [];
        for(var i = 0; i < 4; i++) {
          for(var j = 0; j < 4; j++){
              var tile = new TileView({
              size:[100,100],
              value: i + ' ' + j
            });

            var tileMod = new Modifier({
              origin:[0.5,0],
              transform: Transform.translate(-1000, -1000, 100)
            });

            this.tileModifiers.push(tileMod);
            this._add(tileMod).add(tile);
          }
        }
    };

    function _coords(){
      this.positions = [];
      for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++){
          this.positions.push([i*125,j*125]);
        }
      }
    };

    function _animateTilesIn(){
      for(var i = 0; i < this.tileModifiers.length; i++) {
        Timer.setTimeout(function(i) {
          // var yOffset = this.options.topOffset + this.options.stripOffset * i;
          console.log(this.positions[i][0], this.positions[i][1])
          this.tileModifiers[i].setTransform(
            Transform.translate(this.positions[i][0]-(200-13.5), this.positions[i][1]+13.5),
            // Transform.translate(0, 0, 0),
            { duration: 400, curve: Easing.outQuint });
        }.bind(this, i), i * 20)
      }
    };


    module.exports = GameView;
});