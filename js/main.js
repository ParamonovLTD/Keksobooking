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

document.querySelector('.map').classList.remove('map--faded');

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

pinListElement.appendChild(pinsFragment);

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
map.insertBefore(cardFragment, mapFiltersContainer);
