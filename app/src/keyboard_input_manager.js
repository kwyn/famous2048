define(function(require, module, exports){
  var controller = require('src/controller');

  function KeyboardInputManager() {
    this.events = {};
    this.listen();
  }

  KeyboardInputManager.prototype.on = function (event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  };

  KeyboardInputManager.prototype.emit = function (event, data) {
    var callbacks = this.events[event];
    if (callbacks) {
      callbacks.forEach(function (callback) {
        callback(data);
      });
    }
  };

  KeyboardInputManager.prototype.listen = function () {
    var self = this;

    var map = {
      38: 0, // Up
      39: 1, // Right
      40: 2, // Down
      37: 3, // Left
      75: 0, // Vim up
      76: 1, // Vim right
      74: 2, // Vim down
      72: 3, // Vim left
      87: 0, // W
      68: 1, // D
      83: 2, // S
      65: 3  // A
    };

    // Respond to direction keys
    document.addEventListener("keydown", function (event) {
      var modifiers = event.altKey || event.ctrlKey || event.metaKey ||
                      event.shiftKey;
      var mapped    = map[event.which];

      if (!modifiers) {
        if (mapped !== undefined) {
          event.preventDefault();
          controller.emit("move", mapped);
        }
      }

      // R key restarts the game
      if (!modifiers && event.which === 82) {
        self.restart.call(self, event);
      }
    });

  };

  KeyboardInputManager.prototype.restart = function (event) {
    event.preventDefault();
    controller.emit('restart');
  };

  KeyboardInputManager.prototype.keepPlaying = function (event) {
    event.preventDefault();
    controller.emit('keepPlaying');
  };
  module.exports = KeyboardInputManager;
});
