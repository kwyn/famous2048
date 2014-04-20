/*globals define*/
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var AppView = require('src/AppView');
    var Game = require('src/application');
    var GenericSync        = require('famous/inputs/GenericSync');
    var MouseSync          = require('famous/inputs/MouseSync');
    require('famous/inputs/FastClick');
    GenericSync.register(MouseSync);
    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    var appView = new AppView();

    mainContext.add(appView);

});
