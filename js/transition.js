'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var formInputs = adForm.querySelectorAll('input');
  var formSelectors = adForm.querySelectorAll('select');
  var formComment = adForm.querySelector('textarea');
  var formSubmitButton = adForm.querySelector('.ad-form__submit');
  var formResetButton = adForm.querySelector('.ad-form__reset');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapFilters = mapFiltersContainer.querySelector('.map__filters');


  var onMapInactiveTransition = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    formInputs.forEach(function (input) {
      input.setAttribute('disabled', 'disabled');
      input.parentElement.setAttribute('disabled', 'disabled');
    });
    formSelectors.forEach(function (select) {
      select.setAttribute('disabled', 'disabled');
      select.parentElement.setAttribute('disabled', 'disabled');
    });
    formComment.setAttribute('disabled', 'disabled');
    formSubmitButton.setAttribute('disabled', 'disabled');
    formResetButton.setAttribute('disabled', 'disabled');
    mapFilters.classList.add('map__filters--disabled');
    adForm.reset();
  };


  var onMapActiveTransition = function (evt) {
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
      formComment.removeAttribute('disabled');
      formSubmitButton.removeAttribute('disabled');
      formResetButton.removeAttribute('disabled');
      mapFilters.classList.remove('map__filters--disabled');
    }
  };


  window.transition = {
    onMapInactiveTransition: onMapInactiveTransition,
    onMapActiveTransition: onMapActiveTransition
  };
})();
