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

  var appendPins = function () {
    var pinsFragment = document.createDocumentFragment();

    window.data.pins.forEach(function (pin) {
      pinsFragment.appendChild(window.pin.renderPin(pin));
    });

    pinListElement.appendChild(pinsFragment);

    insertCard();
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

  var insertCard = function () {
    var allPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    var cardFragment = document.createDocumentFragment();

    window.data.pins.forEach(function (pin, index) {
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
    appendPins();
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

  var inactiveToActive = function () {
    mainMapPin.addEventListener('mousedown', onMapTransition);
    mainMapPin.addEventListener('mousedown', window.form.fillAddress);
    mainMapPin.addEventListener('keydown', onMapTransition);
  };

  inactiveToActive();
})();
