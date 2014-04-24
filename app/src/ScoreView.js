define(function(require, exports, module) {
    var Surface         = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform       = require('famous/core/Transform');
    var View            = require('famous/core/View');

    var controller = require('src/controller');

    var height = 50;
    var width = 100;

    function ScoreView() {
        View.apply(this, arguments);
        _createScore.call(this);
        _handleUpdates.call(this);
    }

    ScoreView.prototype = Object.create(View.prototype);
    ScoreView.prototype.constructor = ScoreView;

    ScoreView.DEFAULT_OPTIONS = {
        scoreValue : '0',
        scoreTitle : 'Score'
    };
    function _createScore(){
        var scoreBackground= new Surface({
            size:[width, height],
            properties: {
                border: '1px solid grey',
                borderRadius: '5px'
            }
        });

        this.scoreTitleSurface = new Surface({
            size: [width, height/2],
            content: this.options.scoreTitle,
            properties:{
                color: 'white',
                fontSize: '20px',
                textAlign: 'center'
            }

        });

        this.scoreTitleModifier = new Modifier();

        this.scoreValueSurface = new Surface({
            size: [width, height/2],
            content: this.options.scoreValue,
            properties:{
                color:'white',
                fontSize:' 20px',
                textAlign: 'center'
            }
        });


        this.scoreValueModifier = new Modifier({
            transform: Transform.translate(0, 23, 0)
        });

        this._add(scoreBackground);
        this._add(this.scoreTitleSurface);
        this._add(this.scoreValueModifier).add(this.scoreValueSurface);
    };
  
    function _handleUpdates(){
        controller.on("scoreUpdate", function(data){
            if(this.options.scoreTitle === data.title){
                this.scoreValueSurface.setContent(data.value);
            }
        }.bind(this));
    };



    module.exports = ScoreView;
});