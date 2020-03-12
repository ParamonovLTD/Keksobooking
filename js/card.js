'use strict';

(function () {
  var homeTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');


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


  window.card = {
    renderCard: renderCard
  };
})();
