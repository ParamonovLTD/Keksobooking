'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (pinData) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.setAttribute('style', 'left: ' + (pinData.location.x - pinElement.offsetWidth / 2) + 'px; top: ' + (pinData.location.y - pinElement.offsetHeight) + 'px;');
    pinElement.firstElementChild.src = pinData.author.avatar;
    pinElement.firstElementChild.alt = pinData.offer.title;
    return pinElement;
  };

  window.pin = {
    renderPin: renderPin
  };
})();
