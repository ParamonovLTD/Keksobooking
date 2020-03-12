'use strict';

(function () {
  var PIN_TOP_COORDINATE_MIN = 130;
  var PIN_TOP_COORDINATE_MAX = 630;
  var mapPins = document.querySelector('.map__pins');
  var mainMapPin = mapPins.querySelector('.map__pin--main');


  window.onMainPinDrag = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      if (mainMapPin.offsetTop < PIN_TOP_COORDINATE_MIN && mainMapPin.offsetTop + shift.y < mainMapPin.offsetTop) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
      if (mainMapPin.offsetTop > PIN_TOP_COORDINATE_MAX && mainMapPin.offsetTop + shift.y > mainMapPin.offsetTop) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
      mainMapPin.style.top = (mainMapPin.offsetTop + shift.y) + 'px';
      mainMapPin.style.left = (mainMapPin.offsetLeft + shift.x) + 'px';
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
})();
