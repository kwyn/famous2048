define(function(require, exports, module) {
    var Surface         = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform       = require('famous/core/Transform');
    var View            = require('famous/core/View');
    var Timer           = require('famous/utilities/Timer');
    var ScoreView       = require('src/ScoreView');
    var controller      = require('src/controller');
    var LocalStorageManager = require('src/local_storage_manager');
    var Transitionable  = require('famous/transitions/Transitionable');
    var SpringTransition = require('famous/transitions/SpringTransition');

    var storage = new LocalStorageManager.exports();

    Transitionable.registerMethod('spring', SpringTransition);

    function HeaderView() {
        View.apply(this, arguments);
        _createHeader.call(this);
        _animateInHeader.call(this);
    }

    HeaderView.prototype = Object.create(View.prototype);
    HeaderView.prototype.constructor = HeaderView;

    HeaderView.DEFAULT_OPTIONS = {};

    function _createHeader() {
        console.log("HeaderView", this.options.size);
        this.width = this.options.size[0];
        this.height = this.options.size[1];
        this.offset = 175;
        
        if(this.width < 520){
            this.offset = 105;
        }

        this.newGameButton = new Surface({
            size: [100, 50],
            content: 'New Game',
            properties:{
                color: 'white',
                border: '1px solid grey',
                borderRadius: '5px',
                textAlign: 'center',
                lineHeight: '1.5'
            }
        })
        
        this.newGameButton.on('click', function(){
            controller.emit('restart');
        }.bind(this));

        this.newGameModifier = new Modifier({
            transform: Transform.translate(this.offset, -200, 0)
        });

        this.titleSurface = new Surface({
            size:[this.width/2, this.height],
            content: '20.48',
            properties:{
                color: 'white',
                fontSize: '50px',
                textAlign: 'center'
                }
        });

        var bestScoreView = new ScoreView({
            scoreTitle: 'Best',
            scoreValue: '' + storage.getBestScore()
        });

        var scoreView = new ScoreView({
            scoreTitle: 'Score',
            scoreValue: '0'
        });

        this.bestScoreModifier = new Modifier({
            origin:[0.5, 0],
            transform: Transform.translate(-this.offset, -200, 0)
        });
        this.scoreModifier =  new Modifier({
            origin:[0.5, 0],
            transform: Transform.translate(0, -200, 0)
        });

        this.backgrounModifier = new Modifier();

        this.titleModifier = new Modifier({
            origin:[0.5,0],
            transform: Transform.translate(0, 50, 0),
            opacity: 0
        })
        
        this._add(this.titleModifier).add(this.titleSurface);
        this._add(this.bestScoreModifier).add(bestScoreView);
        this._add(this.scoreModifier).add(scoreView);
        this._add(this.newGameModifier).add(this.newGameButton);
    };

    function _animateInHeader(){
        this.modifiers = [this.bestScoreModifier, this.scoreModifier, this.newGameModifier];
        var spring = {
          method: 'spring',
          period: 1000,
          dampingRatio: 0.2
        };
        for(var i = 0; i < this.modifiers.length; i ++){
            Timer.setTimeout(function(i){
                this.modifiers[i].setTransform(Transform.translate(-this.offset+(i*this.offset),150), spring);
            }.bind(this, i), i*200); 
        }
        Timer.setTimeout(function(){
            this.titleModifier.setOpacity(1,{duration:500});
        }.bind(this), this.modifiers.length*500)
        
    }
    module.exports = HeaderView;
});