'use strict';

(function () {
  var pins = [];
  var mapPins = document.querySelector('.map__pins');
  var checkins = ['12:00', '13:00', '14:00'];
  var checkouts = ['12:00', '13:00', '14:00'];
  var allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var currentFeatures = [];
  var homePhotos = [];
  var homeTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var getFeatures = function () {
    var allFeaturesLength = allFeatures.length;
    for (var i = 0; i < window.util.getRandomNumber(1, allFeaturesLength); i++) {
      var randomFeature = window.util.getRandomNumber(0, allFeatures.length - 1);
      currentFeatures.push(allFeatures[randomFeature]);
      allFeatures.splice(randomFeature, 1);
    }
    currentFeatures.forEach(function (feature) {
      allFeatures.push(feature);
    });
  };

  var getHomePhotos = function () {
    for (var i = 0; i < window.util.getRandomNumber(1, 3); i++) {
      homePhotos.push('http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg');
    }
  };

  var getLocationX = function () {
    return mapPins.offsetWidth;
  };

  getFeatures();

  getHomePhotos();

  var pinsQuantity = 8;
  var pinTopCoordinateMin = 130;
  var pinTopCoordinateMax = 630;
  var pinLeftCoordinateMin = 0;
  var pinLeftCoordinateMax = getLocationX();

  var getPinsData = function () {
    for (var i = 0; i < pinsQuantity; i++) {
      var data = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: i + 1,
          address: i + 1,
          price: i + 1,
          type: Object.keys(homeTypes)[window.util.getRandomNumber(0, 3)],
          rooms: window.util.getRandomNumber(1, 5),
          guests: window.util.getRandomNumber(1, 4),
          checkin: checkins[window.util.getRandomNumber(0, 2)],
          checkout: checkouts[window.util.getRandomNumber(0, 2)],
          features: currentFeatures,
          description: i + 1,
          photos: homePhotos
        },
        location: {
          x: window.util.getRandomNumber(pinLeftCoordinateMin, pinLeftCoordinateMax),
          y: window.util.getRandomNumber(pinTopCoordinateMin, pinTopCoordinateMax)
        }
      };
      pins.push(data);
    }
  };

  getPinsData();

  window.data = {
    pins: pins
  };
})();
