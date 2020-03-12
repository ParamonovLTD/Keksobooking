'use strict';

(function () {
  var PINS_MAX_QUANTITY = 5;
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var allData = [];
  var pinListElement = mapPins;
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mainMapPin = mapPins.querySelector('.map__pin--main');


  var appendPins = function (data) {
    data.forEach(function (it) {
      allData.push(it);
    });
    var pinsFragment = document.createDocumentFragment();
    var currentData = data.slice(0, PINS_MAX_QUANTITY);
    currentData.forEach(function (pin) {
      pinsFragment.appendChild(window.pin.renderPin(pin));
    });
    removePins();
    pinListElement.appendChild(pinsFragment);
    insertCard(currentData);
  };
  var removePins = function () {
    var allPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    allPins.forEach(function (pin) {
      pin.remove();
    });
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


  var pageLoad = function () {
    document.addEventListener('DOMContentLoaded', window.transition.onMapInactiveTransition);
  };
  pageLoad();


  var cardAssembly = {
    appendPins: appendPins,
    onMapTransition: window.transition.onMapActiveTransition
  };
  var onPinsReady = function () {
    var filter = document.querySelector('.map__filters');
    filter.reset();
    window.backend.load(cardAssembly);
  };


  var inactiveToActive = function () {
    mainMapPin.addEventListener('mousedown', window.transition.onMapActiveTransition);
    mainMapPin.addEventListener('mousemove', window.form.fillAddress);
    mainMapPin.addEventListener('keydown', window.transition.onMapActiveTransition);
    mainMapPin.addEventListener('mousedown', onPinsReady);
    mainMapPin.addEventListener('keydown', onPinsReady);
  };
  inactiveToActive();


  var mainPinDrag = function () {
    mainMapPin.addEventListener('mousedown', window.onMainPinDrag);
  };
  mainPinDrag();


  window.map = {
    onMapInactiveTransition: window.transition.onMapInactiveTransition,
    appendPins: appendPins,
    removePins: removePins,
    cardClose: cardClose,
    allData: allData
  };
})();
