'use strict';

(function () {
  var PIN_TOP_COORDINATE_MIN = 130;
  var PIN_TOP_COORDINATE_MAX = 630;
  var mapPins = document.querySelector('.map__pins');
  var mainMapPin = mapPins.querySelector('.map__pin--main');


  var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };


  window.onMainPinDrag = function (evt) {
    evt.preventDefault();
    var startCoords = new Coordinate(evt.clientX, evt.clientY);
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = new Coordinate(moveEvt.clientX - startCoords.x, moveEvt.clientY - startCoords.y);
      startCoords = new Coordinate(moveEvt.clientX, moveEvt.clientY);
      if (mainMapPin.offsetTop < PIN_TOP_COORDINATE_MIN &&
          mainMapPin.offsetTop + shift.y < mainMapPin.offsetTop) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
      if (mainMapPin.offsetTop > PIN_TOP_COORDINATE_MAX &&
          mainMapPin.offsetTop + shift.y > mainMapPin.offsetTop) {
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
