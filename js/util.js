'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  var isEscapeEvent = function (evt, action) {
    if (evt.keyCode === 27) {
      action();
    }
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    isEscapeEvent: isEscapeEvent
  };
})();
