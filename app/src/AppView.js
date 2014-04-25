define(function(require, exports, module) {
    var Engine         = require('famous/core/Engine')
    var Surface         = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform       = require('famous/core/Transform');
    var View            = require('famous/core/View');
    var GenericSync     = require('famous/inputs/GenericSync');
    var TouchSync       = require('famous/inputs/TouchSync');

    var controller      = require('src/controller');
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
        this.pageView = new PageView({
            size: this.options.size
        });
        this.pageMod = new Modifier({
            origin: [0.5,0]
        });

        this._add(this.pageMod).add(this.pageView);
    }

    function _handleTouch() {
        /* 0 : up
         * 1 : right
         * 2 : down
         * 3 : left
         */
        this.sync = new GenericSync(function() {
            return this.pageViewX;
        }.bind(this));

        this.pageView.pipe(this.sync);

        this.sync.on('end', function(data) {
            //check if x or y direction movement is greater
            if(Math.abs(data.delta[0]) > Math.abs(data.delta[1])){
                //detemine x direction. 1 : right, 3 : left
                if(data.delta[0] > 0){
                    controller.emit('move', 1);
                }else if (data.delta[0] < 0){
                    controller.emit('move', 3);
                }
            }else{
                //determine y direction. 0 : up, 2: down
                if(data.delta[1] > 0){
                    controller.emit('move', 2);
                }else if(data.delta[1] < 0){
                    controller.emit('move', 0);
                }

            }
        }.bind(this));
    }

    module.exports = AppView;
});