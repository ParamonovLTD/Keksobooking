'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var mainMapPin = mapPins.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var addressInput = adForm.querySelector('#address');
  var minPrices = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };
  var adHomeType = adForm.querySelector('#type');
  var adNightPrice = adForm.querySelector('#price');
  var adTimeIn = adForm.querySelector('#timein');
  var adTimeOut = adForm.querySelector('#timeout');
  var adRoomsSelect = adForm.querySelector('#room_number');
  var adCapacitySelect = adForm.querySelector('#capacity');


  var fillAddress = function () {
    addressInput.value = Math.floor(mainMapPin.offsetWidth / 2 + mainMapPin.offsetLeft) + ', ' + Math.floor(mainMapPin.offsetHeight + mainMapPin.offsetTop);
  };
  var addressOnload = function () {
    document.addEventListener('DOMContentLoaded', fillAddress);
  };
  addressOnload();


  var onHomeTypeChange = function () {
    adNightPrice.setAttribute('placeholder', minPrices[adHomeType.value]);
    adNightPrice.setAttribute('min', minPrices[adHomeType.value]);
  };
  var homeTypeChange = function () {
    adHomeType.addEventListener('change', onHomeTypeChange);
    document.addEventListener('DOMContentLoaded', onHomeTypeChange);
  };
  homeTypeChange();


  var onTimeInChange = function () {
    adTimeOut.value = adTimeIn.value;
  };
  var onTimeOutChange = function () {
    adTimeIn.value = adTimeOut.value;
  };
  var adTimeChange = function () {
    adTimeIn.addEventListener('change', onTimeInChange);
    adTimeOut.addEventListener('change', onTimeOutChange);
  };
  adTimeChange();

  var onInvalidSelectors = function () {
    if (+adRoomsSelect.value > 10 && +adCapacitySelect.value !== 0) {
      adRoomsSelect.setCustomValidity('Этот нечеловеческий дом не для гостей.');
    } else if (+adCapacitySelect.value > +adRoomsSelect.value) {
      adCapacitySelect.setCustomValidity('Количество гостей не может быть больше, чем число комнат.');
    } else {
      adRoomsSelect.setCustomValidity('');
      adCapacitySelect.setCustomValidity('');
    }
  };
  var invalidSelectorsWithoutChanges = function () {
    if (+adCapacitySelect.value > +adRoomsSelect.value) {
      adCapacitySelect.setCustomValidity('Количество гостей не может быть больше, чем число комнат.');
    } else if (+adRoomsSelect.value > 10 && +adCapacitySelect.value !== 0) {
      adRoomsSelect.setCustomValidity('Этот нечеловеческий дом не для гостей.');
    }
  };
  invalidSelectorsWithoutChanges();
  var invalidSelectorsValue = function () {
    adRoomsSelect.addEventListener('change', onInvalidSelectors);
    adCapacitySelect.addEventListener('change', onInvalidSelectors);
  };
  invalidSelectorsValue();


  var onSuccess = function () {
    window.map.onMapInactiveTransition();
    window.map.removePins();
    fillAddress();
    onHomeTypeChange();
    window.formStatus.renderSuccessMessage();
    // document.createElement(successElement);
  };
  var onError = function () {
    window.formStatus.renderErrorMessage();
  };

  var formReset = function () {
    var resetButton = adForm.querySelector('.ad-form__reset');
    resetButton.addEventListener('click', adForm.reset());
  };
  formReset();
  var formSubmit = function () {
    adForm.addEventListener('submit', function (evt) {
      window.backend.upLoad(new FormData(adForm), onSuccess, onError);
      evt.preventDefault();
    });
  };
  formSubmit();


  window.form = {
    fillAddress: fillAddress
  };
})();
