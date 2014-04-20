define(function(require, exports, module) {
    var Surface         = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform       = require('famous/core/Transform');
    var View            = require('famous/core/View');

    var ScoreView       = require('src/ScoreView');

    var LocalStorageManager = require('src/local_storage_manager');

    var storage = new LocalStorageManager.exports();

    var width = 500;
    var height = 250;
    function HeaderView() {
        View.apply(this, arguments);
        _createHeader.call(this);
    }

    HeaderView.prototype = Object.create(View.prototype);
    HeaderView.prototype.constructor = HeaderView;

    HeaderView.DEFAULT_OPTIONS = {};

    function _createHeader() {
        var backgroundSurface = new Surface({
            size:[width, height],
            properties: {
                color: 'white',
                backgroundColor: 'black'
            }
        });
        
        this.titleSurface = new Surface({
            size:[width/2, height],
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
            transform: Transform.translate(150, 25, 0)
        });
        this.scoreModifier =  new Modifier({
            origin: [0.5, 0],
            transform: Transform.translate(150, 85, 0)
        });

        this.backgrounModifier = new Modifier();

        this.titleModifier = new Modifier({
            origin:[0.5,0],
            transform: Transform.translate(-100, 25, 0)
        })
        
        this._add(backgroundSurface);
        this._add(this.titleModifier).add(this.titleSurface);
        this._add(this.bestScoreModifier).add(bestScoreView);
        this._add(this.scoreModifier).add(scoreView);
    };

    module.exports = HeaderView;
});