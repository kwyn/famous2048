// Wait till the browser is ready to render the game (avoids glitches)
define(function(require, module, exports){
	var KeyboardInputManager = require('src/keyboard_input_manager');
	var HTMLActuator = require('src/html_actuator');
	var LocalStorageManager = require('src/local_storage_manager');
	var GameManager = require('src/game_manager');
	window.requestAnimationFrame(function () {
  	new GameManager.exports(4, KeyboardInputManager.exports, HTMLActuator, LocalStorageManager.exports);
	});
});
