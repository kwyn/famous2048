define(function(require, exports, module) {
    var Engine         = require('famous/core/Engine')
    var Surface         = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform       = require('famous/core/Transform');
    var View            = require('famous/core/View');

    var PageView        = require('./PageView');

    function AppView() {
        View.apply(this, arguments);

        _createPageView.call(this);
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

    // function _handleTouch() {
    //     this.sync = GenericSync(function(){

    //     }.bind(this),{direction: GenericSync.DIRECTION_X} )
    // }

    module.exports = AppView;
});