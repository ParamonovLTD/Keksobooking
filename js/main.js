'use strict';

var ads = [];
var typesOfHome = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var allFacilities = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var currentFacilities = [];
var homePhotos = [];

var map = document.querySelector('.map__pins');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getFacilities = function () {
  var allFacilitiesLength = allFacilities.length;
  for (var i = 0; i < getRandomNumber(1, allFacilitiesLength); i++) {
    var randomFacilitie = getRandomNumber(0, allFacilities.length - 1);
    currentFacilities.push(allFacilities[randomFacilitie]);
    allFacilities.splice(randomFacilitie, 1);
  }

  currentFacilities.forEach(function (faciliti) {
    allFacilities.push(faciliti);
  });
};

var getHomePhotos = function () {
  for (var i = 1; i < getRandomNumber(2, 4); i++) {
    homePhotos.push('http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg');
  }
};

var getLocationX = function () {
  return map.offsetWidth;
};

getFacilities();

getHomePhotos();


for (var i = 1; i < 9; i++) {
  var advert = {
    'author': {
      'avatar': 'img/avatars/user0' + i + '.png'
    },
    'offer': {
      'title': 'Загаловок ' + i,
      'address': 'Адрес' + i,
      'price': 'Цена' + i,
      'type': typesOfHome[getRandomNumber(0, 3)],
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 4),
      'checkin': checkins[getRandomNumber(0, 2)],
      'checkout': checkouts[getRandomNumber(0, 2)],
      'features': currentFacilities,
      'description': 'Описание' + i,
      'photos': homePhotos
    },
    'location': {
      'x': getRandomNumber(1, getLocationX()),
      'y': getRandomNumber(130, 630)
    }
  };

  ads.push(advert);
}

document.querySelector('.map').classList.remove('map--faded');

var adListElement = map;
var adTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var renderAd = function (ad) {
  var adElement = adTemplate.cloneNode(true);

  adElement.setAttribute('style', 'left: ' + (ad.location.x - adElement.offsetWidth / 2) + 'px; top: ' + (ad.location.y - adElement.offsetHeight / 2) + 'px;');
  adElement.firstElementChild.src = ad.author.avatar;
  adElement.firstElementChild.alt = ad.offer.title;

  return adElement;
};

var fragment = document.createDocumentFragment();

ads.forEach(function (ad) {
  fragment.appendChild(renderAd(ad));
});

adListElement.appendChild(fragment);
