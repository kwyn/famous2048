/*globals define*/
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var AppView = require('src/AppView');
    var GenericSync        = require('famous/inputs/GenericSync');
    var MouseSync          = require('famous/inputs/MouseSync');
    var TouchSync          = require('famous/inputs/TouchSync')
    var Game = require('src/application');
    var controller         = require('src/controller');
    require('famous/inputs/FastClick');
    GenericSync.register(TouchSync);
    GenericSync.register(MouseSync);
    // create the main context
    var mainContext = Engine.createContext();

    var portSize = [500, 1000];

    if(window.innerWidth < 520){
        portSize = [280, 1000];
    }

    console.log("main", portSize);
    // your app here
    var appView = new AppView({
        size: portSize
    });

    mainContext.add(appView);
    mainContext.setPerspective(800);
});
