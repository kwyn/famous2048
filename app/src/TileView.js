define(function(require, exports, module) {
    var Surface         = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform       = require('famous/core/Transform');
    var View            = require('famous/core/View');

    function tileView() {
        View.apply(this, arguments);
        _addTile.call(this);
    }

    tileView.prototype = Object.create(View.prototype);
    tileView.prototype.constructor = tileView;

    tileView.DEFAULT_OPTIONS = {
    	size: [100,100]
    };

    function _addTile() {
    	this.tileSurface = new Surface({
    		size: this.options.size,
    		content: '',
    		properties: this.options.properties
    	});
    	this.tileMod = new Modifier({
    		opacity: 0.5
    	})
    	this._add(this.tileMod).add(this.tileSurface);
    }


    module.exports = tileView;
});