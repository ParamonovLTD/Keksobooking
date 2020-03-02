'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var pinListElement = mapPins;
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mainMapPin = mapPins.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var formInputs = adForm.querySelectorAll('input');
  var formSelectors = adForm.querySelectorAll('select');
  var mapFilters = mapFiltersContainer.querySelector('.map__filters');
  var pinTopCoordinateMin = 130;
  var pinTopCoordinateMax = 630;


  var appendPins = function (data) {
    var pinsFragment = document.createDocumentFragment();

    data.forEach(function (pin) {
      pinsFragment.appendChild(window.pin.renderPin(pin));
    });
    pinListElement.appendChild(pinsFragment);
    insertCard(data);
  };


  var cardClose = function () {
    var mapCard = map.querySelector('.map__card');
    map.removeChild(mapCard);
  };
  var onCardEscapePress = function (evt) {
    var mapCard = map.querySelector('.map__card');
    if (mapCard) {
      window.util.isEscapeEvent(evt, cardClose);
    }
  };


  var insertCard = function (data) {
    var allPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    var cardFragment = document.createDocumentFragment();

    data.forEach(function (pin, index) {
      allPins[index].addEventListener('click', function () {

        var mapCard = document.querySelector('.map__card');
        if (mapCard) {
          map.removeChild(mapCard);
        }
        cardFragment.appendChild(window.card.renderCard(pin));
        map.insertBefore(cardFragment, mapFiltersContainer);
        mapCard = document.querySelector('.map__card');
        if (mapCard) {
          var mapCardClose = mapCard.querySelector('.popup__close');
          mapCardClose.addEventListener('click', function () {
            map.removeChild(mapCard);
          });
        }
        window.addEventListener('keydown', onCardEscapePress);
      });
    });
  };


  var onMapTransition = function (evt) {
    if (evt.which === 1 || evt.keyCode === 13) {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      formInputs.forEach(function (input) {
        input.removeAttribute('disabled');
        input.parentElement.removeAttribute('disabled');
      });
      formSelectors.forEach(function (select) {
        select.removeAttribute('disabled');
        select.parentElement.removeAttribute('disabled');
      });
      mapFilters.classList.remove('map__filters--disabled');
    }
  };


  var cardAssembly = {
    appendPins: appendPins,
    onMapTransition: onMapTransition
  };
  var onPinsReady = function () {
    window.backend.load(cardAssembly);
  };

  var inactiveToActive = function () {
    mainMapPin.addEventListener('mousedown', onMapTransition);
    mainMapPin.addEventListener('mousemove', window.form.fillAddress);
    mainMapPin.addEventListener('keydown', onMapTransition);
    mainMapPin.addEventListener('mousedown', onPinsReady);
    mainMapPin.addEventListener('keydown', onPinsReady);
  };

  inactiveToActive();

  var mainPinDrag = function (evt) {
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
      if (mainMapPin.offsetTop < pinTopCoordinateMin && mainMapPin.offsetTop + shift.y < mainMapPin.offsetTop) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
      if (mainMapPin.offsetTop > pinTopCoordinateMax && mainMapPin.offsetTop + shift.y > mainMapPin.offsetTop) {
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

  mainMapPin.addEventListener('mousedown', mainPinDrag);
})();
