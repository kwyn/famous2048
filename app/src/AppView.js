define(function(require, exports, module) {
    var Engine         = require('famous/core/Engine')
    var Surface         = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform       = require('famous/core/Transform');
    var View            = require('famous/core/View');
    var GenericSync     = require('famous/inputs/GenericSync');
    var TouchSync       = require('famous/inputs/TouchSync');

    var PageView        = require('./PageView');

    GenericSync.register(TouchSync);
    console.log(GenericSync);
    function AppView() {
        View.apply(this, arguments);

        _createPageView.call(this);
        _handleTouch.call(this);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {};

    function _createPageView() {
        this.pageView = new PageView();
        this.pageMod = new Modifier({
            origin: [0.5,0]
        });

        this._add(this.pageMod).add(this.pageView);
    }

    function _handleTouch() {
        this.pageViewX = 0;
        this.pageViewY = 0;

        this.latteralSync = new GenericSync(function() {
            return this.pageViewX;
        }.bind(this), {direction: GenericSync.DIRECTION_X});

        this.verticalSync = new GenericSync(function(){
            return this.pageViewY;
        }.bind(this), {direction: GenericSync.DIRECTION_Y});

        this.pageView.pipe(this.latteralSync);
        this.pageView.pipe(this.verticalSync);

        this.latteralSync.on('update', function(data) {
            if(Math.abs(data.delta) > 10 ) {
                console.log('x = ' +data.position);
                this.pageViewX = data.position;
                this.pageMod.setTransform(Transform.translate(data.position, 0, 0));
            }
        }.bind(this));
         this.verticalSync.on('update', function(data) {
            if(Math.abs(data.delta) > 10 ){
                console.log('y = ' + data.position);
                this.pageViewY = data.position;
                this.pageMod.setTransform(Transform.translate(0, data.position, 0));
            }
        }.bind(this));
    }

    module.exports = AppView;
});