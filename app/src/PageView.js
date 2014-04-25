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
            size: [undefined, undefined]
        });

        this._add(this.backgroundSurface);
    }

    function _createHeaderView(){
        this.width = this.options.size[0];
        this.height = this.options.size[0];
        this.headerView = new HeaderView({
            size: [this.width, 250]
        });
        this._add(this.headerView);
    };
    function _createGameView(){
        
        console.log("GameView", this.options.size)
        this.gameView = new GameView({
            size: [this.width, this.width]
        });
        this.gameViewMod = new Modifier({
            origin:[0.5,0],
            transform: Transform.translate(0, 250, 1),
            opacity:1
        })
        this.gameView.pipe(this._eventOutput);
        this._add(this.gameViewMod).add(this.gameView);
    };


    module.exports = PageView;
});