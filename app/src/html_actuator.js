define(function(require, exports, module) {
  var controller = require('src/controller');
  function HTMLActuator() {
    this.score = 0;
  }

  HTMLActuator.prototype.actuate = function (grid, metadata) {
    var self = this;

    window.requestAnimationFrame(function () {
      // self.clearContainer(self.tileContainer);
      controller.emit('clear');

      grid.cells.forEach(function (column) {
        column.forEach(function (cell) {
          if (cell) {
            self.addTile(cell);
          }
        });
      });

      self.updateScore(metadata.score);
      self.updateBestScore(metadata.bestScore);

      if (metadata.terminated) {
        if (metadata.over) {
          self.message(false); // You lose
        } else if (metadata.won) {
          self.message(true); // You win!
        }
      }

    });
  };

  HTMLActuator.prototype.addTile = function (tile) {
    var self = this;

    if (tile.mergedFrom) {
      tile.mergedFrom.forEach(function (merged) {
        self.addTile(merged);
      });
    }
    controller.emit('addTile',{
      tile:tile
    });
  };

  HTMLActuator.prototype.normalizePosition = function (position) {
    return { x: position.x + 1, y: position.y + 1 };
  };

  HTMLActuator.prototype.updateScore = function (score) {
      controller.emit("scoreUpdate", {title:'Score', value: score});
      this.score += score-this.score;
  };

  HTMLActuator.prototype.updateBestScore = function (bestScore) {
    controller.emit("scoreUpdate", {title:'Best', value: bestScore});
  };

  HTMLActuator.prototype.message = function (won) {
    var type    = won ? "game-won" : "game-over";
    var message = won ? "You win!" : "Game over!";
    controller.emit(type);
  };


  module.exports = HTMLActuator;
});