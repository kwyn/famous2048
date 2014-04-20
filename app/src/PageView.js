define(function(require, exports, module) {
    var Surface         = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform       = require('famous/core/Transform');
    var View            = require('famous/core/View');

    var HeaderView      = require('src/HeaderView');
    var GameView        = require('src/GameView');

    function PageView() {
        View.apply(this, arguments);
        _createBackground.call(this);
        _createHeaderView.call(this);
        _createGameView.call(this);
    };

    PageView.prototype = Object.create(View.prototype);
    PageView.prototype.constructor = PageView;

    PageView.DEFAULT_OPTIONS = {};

    function _createBackground(){
        this.backgroundSurface = new Surface({
            size: [500, undefined],
            properties:{
                backgroundColor: 'black'
            }
        });
        this._add(this.backgroundSurface);
    }

    function _createGameView(){
        this.gameView = new GameView();
        var gameViewMod = new Modifier({
            origin: [0.5, 0],
            transform: Transform.translate(0, 250, 0)
        })
        this._add(gameViewMod).add(this.gameView);
    };

    function _createHeaderView(){
        this.headerView = new HeaderView();
        this._add(this.headerView);
    };

    module.exports = PageView;
});