/*globals define*/
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var AppView = require('src/AppView');
    var Game = require('src/application');
    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    var appView = new AppView();

    mainContext.add(appView);

});
