'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;


  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  var isEscapeEvent = function (evt, action) {
    if (evt.keyCode === 27) {
      action();
    }
  };


  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };


  window.util = {
    getRandomNumber: getRandomNumber,
    isEscapeEvent: isEscapeEvent,
    debounce: debounce
  };
})();
