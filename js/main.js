'use strict';

var pins = [];
var homeTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var currentFeatures = [];
var homePhotos = [];
var mapPins = document.querySelector('.map__pins');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getFeatures = function () {
  var allFeaturesLength = allFeatures.length;
  for (var i = 0; i < getRandomNumber(1, allFeaturesLength); i++) {
    var randomFeature = getRandomNumber(0, allFeatures.length - 1);
    currentFeatures.push(allFeatures[randomFeature]);
    allFeatures.splice(randomFeature, 1);
  }
  currentFeatures.forEach(function (feature) {
    allFeatures.push(feature);
  });
};

var getHomePhotos = function () {
  for (var i = 0; i < getRandomNumber(1, 3); i++) {
    homePhotos.push('http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg');
  }
};

var getLocationX = function () {
  return mapPins.offsetWidth;
};

getFeatures();

getHomePhotos();

var getPinsData = function () {
  for (var i = 0; i < 8; i++) {
    var data = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'Заголовок ' + (i + 1),
        'address': 'Адрес' + (i + 1),
        'price': 'Цена' + (i + 1),
        'type': Object.keys(homeTypes)[getRandomNumber(0, 3)],
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 4),
        'checkin': checkins[getRandomNumber(0, 2)],
        'checkout': checkouts[getRandomNumber(0, 2)],
        'features': currentFeatures,
        'description': 'Описание' + (i + 1),
        'photos': homePhotos
      },
      'location': {
        'x': getRandomNumber(0, getLocationX()),
        'y': getRandomNumber(130, 630)
      }
    };
    pins.push(data);
  }
};

getPinsData();

// document.querySelector('.map').classList.remove('map--faded');

var pinListElement = mapPins;
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (pinData) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.setAttribute('style', 'left: ' + (pinData.location.x - pinElement.offsetWidth / 2) + 'px; top: ' + (pinData.location.y - pinElement.offsetHeight) + 'px;');
  pinElement.firstElementChild.src = pinData.author.avatar;
  pinElement.firstElementChild.alt = pinData.offer.title;
  return pinElement;
};

var pinsFragment = document.createDocumentFragment();

pins.forEach(function (pin) {
  pinsFragment.appendChild(renderPin(pin));
});

// pinListElement.appendChild(pinsFragment);

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var cardFragment = document.createDocumentFragment();

var renderFeatures = function (cardElement, pinData) {
  var cardFeatures = cardElement.querySelectorAll('.popup__feature');
  cardFeatures.forEach(function (feature) {
    feature.style = 'display: none;';
  });
  for (var i = 0; i < pinData.offer.features.length; i++) {
    cardElement.querySelector('.popup__feature--' + pinData.offer.features[i]).style = 'display: inline-block;';
  }
};

var renderPhotos = function (cardElement, pinData) {
  var photosFragment = document.createDocumentFragment();
  for (var j = 0; j < pinData.offer.photos.length; j++) {
    var cardPhoto = cardElement.querySelector('.popup__photos').querySelector('.popup__photo').cloneNode(true);
    cardPhoto.src = pinData.offer.photos[j];
    photosFragment.appendChild(cardPhoto);
  }
  cardElement.querySelector('.popup__photos').textContent = '';
  return photosFragment;
};

var renderCard = function (pinData) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = pinData.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = pinData.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = pinData.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = homeTypes[pinData.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = pinData.offer.rooms + ' комнаты для ' + pinData.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;
  renderFeatures(cardElement, pinData);
  cardElement.querySelector('.popup__description').textContent = pinData.offer.description;
  cardElement.appendChild(renderPhotos(cardElement, pinData));
  cardElement.querySelector('.popup__avatar').src = pinData.author.avatar;
  return cardElement;
};

cardFragment.appendChild(renderCard(pins[0]));

var mapFiltersContainer = document.querySelector('.map__filters-container');
var map = document.querySelector('.map');

var mainMapPin = mapPins.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var formInputs = adForm.querySelectorAll('input');
var formSelectors = adForm.querySelectorAll('select');
var mapFilters = mapFiltersContainer.querySelector('.map__filters');

var onMapTransition = function (evt) {
  pinListElement.appendChild(pinsFragment);
  map.insertBefore(cardFragment, mapFiltersContainer);
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

var addressInput = adForm.querySelector('#address');

var fillAddress = function () {
  addressInput.value = Math.floor(mainMapPin.offsetWidth / 2 + mainMapPin.offsetLeft) + ', ' + Math.floor(mainMapPin.offsetHeight + mainMapPin.offsetTop);
};

window.onload = function () {
  fillAddress();
};

var inactiveToActive = function () {
  mainMapPin.addEventListener('mousedown', onMapTransition);
  mainMapPin.addEventListener('mousedown', fillAddress);
  mainMapPin.addEventListener('keydown', onMapTransition);
};

inactiveToActive();

var minPrices = {
  bungalo: '0',
  flat: '1000',
  house: '5000',
  palace: '10000'
};
var adHomeType = adForm.querySelector('#type');
var adNightPrice = adForm.querySelector('#price');
var getMinPriceOfNight = function () {
  adNightPrice.setAttribute('placeholder', minPrices[adHomeType.value]);
  adNightPrice.setAttribute('min', minPrices[adHomeType.value]);
};
adHomeType.addEventListener('change', getMinPriceOfNight);

var adTimeIn = adForm.querySelector('#timein');
var adTimeOut = adForm.querySelector('#timeout');
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

var adRoomsSelect = adForm.querySelector('#room_number');
var adCapacitySelect = adForm.querySelector('#capacity');

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
