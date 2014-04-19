define(function(require, exports, module) {
    var Surface         = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform       = require('famous/core/Transform');
    var View            = require('famous/core/View');

    var GameView        = require('src/GameView');
    
    function PageView() {
        View.apply(this, arguments);

        _createGameView.call(this);
    }

    PageView.prototype = Object.create(View.prototype);
    PageView.prototype.constructor = PageView;

    PageView.DEFAULT_OPTIONS = {};

    function _createGameView(){
        this.gameView = new GameView();
        this._add(this.gameView);
    }

    module.exports = PageView;
});