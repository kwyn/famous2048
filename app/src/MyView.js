define(function(require, exports, module) {
    var Surface         = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform       = require('famous/core/Transform');
    var View            = require('famous/core/View');

    function MyView() {
        View.apply(this, arguments);
    }

    MyView.prototype = Object.create(View.prototype);
    MyView.prototype.constructor = MyView;

    MyView.DEFAULT_OPTIONS = {};

    module.exports = MyView;
});