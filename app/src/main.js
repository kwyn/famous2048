/*globals define*/
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');
    // create the main context
    // This will hold scores and titles and the like.
    var mainContext = Engine.createContext();

    // Eventually Query Media here to determine size variables for various elements
    // For now, just develop for chrome.

    // your app here

    // Define Score Board
    var bestScore = new Surface({
        content: 'Best 0',
        size:[100,50],
        properties: {
            fontSize: '25px',
            color: '#FFF',
            backgroundColor: '#8f7a66',
            borderRadius: '5px',
            textAlign: 'center',
            lineHeight:'50px'
        }
    });

    var bestScoreModifier = new StateModifier({
        origin:[0.5, 0],
        transform: Transform.translate(200, 20, 0)
    });

    var gameState = new Surface({
        content: 'Score 0',
        size:[100,50],
        properties: {
            fontSize: '25px',
            color: '#FFF',
            backgroundColor: '#8f7a66',
            borderRadius: '5px',
            textAlign: 'center',
            lineHeight:'50px'
        }
    });

    var gameStateModifier = new StateModifier({
        origin:[0.5, 0],
        transform: Transform.translate(200, 80, 0)
    });

    // Defined transparent grid as 500, 500
    var gridContainer = new ContainerSurface({
        size: [500,500],
        properties: {
            fontSize: '25px',
            backgroundColor: '#776e65',
            borderRadius: '5px'
        }
    });
    var gridContainerModifier = new StateModifier({
        origin: [0.5, 0],
        transform: Transform.translate(0, 250, 0)
    });

    var gridCell = new Surface({
        size:[116, 116],
        properties:{
            backgroundColor: 'rgba(238, 228, 218, 0.35)',
            borderRadius: '3px'
        }
    });
    //Define tile: 106x106 
    var tileCreator = function(x,y){
        var newTile = new Surface({
            size:[106, 106],
            contents: '',
            properties:{
                fontSize: '55px',
                borderRadius: '3px'
            }
        });
    }
    mainContext.add(bestScoreModifier).add(bestScore);
    mainContext.add(gameStateModifier).add(gameState);
    mainContext.add(gridContainerModifier).add(gridContainer);

    var addNewCell = function(surface, x,y){
        var newGridCell = new Surface({
            size:[106, 106],
            properties:{
                backgroundColor: 'rgba(238, 228, 218, 0.35)',
                borderRadius: '3px'
            }   
        });
        var position = new StateModifier({
            transform: Transform.translate(x, y, 0)
        });

        surface.add(position).add(newGridCell);
    };

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            addNewCell(gridContainer, 16+i*120, 16+j*120);
        }
    }

});
