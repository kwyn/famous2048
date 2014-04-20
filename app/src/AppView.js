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
        this.pageViewPos = 0;

        this.sync = new GenericSync(function() {
            return this.pageViewPos;
        }.bind(this), {direction: GenericSync.DIRECTION_X});

        this.pageView.pipe(this.sync);

        this.sync.on('update', function(data) {
            console.log(data);
            this.pageViewPos = data.p;
            this.pageMod.setTransform(Transform.translate(data.p, 0, 0));
        }.bind(this));
    }

    module.exports = AppView;
});