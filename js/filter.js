'use strict';

(function () {
  var PINS_MAX_QUANTITY = 5;
  var filter = document.querySelector('.map__filters');
  var houseType = filter.querySelector('#housing-type');
  var housePrice = filter.querySelector('#housing-price');
  var houseRooms = filter.querySelector('#housing-rooms');
  var houseGuests = filter.querySelector('#housing-guests');
  var houseFeatures = Array.from(filter.querySelectorAll('.map__checkbox'));


  var homeTypeFilter = function (data) {
    if (houseType.value === 'any') {
      return true;
    }
    return houseType.value === data.offer.type;
  };
  var priceFilter = function (data) {
    switch (housePrice.value) {
      case 'low':
        return data.offer.price < 10000;
      case 'middle':
        return data.offer.price > 10000 && data.offer.price < 50000;
      case 'high':
        return data.offer.price > 50000;
      default:
        return data.offer.price > 0;
    }
  };
  var roomsFilter = function (data) {
    if (houseRooms.value === 'any') {
      return data.offer.rooms.toString() > 0;
    } else {
      return data.offer.rooms.toString() === houseRooms.value;
    }
  };
  var guestsFilter = function (data) {
    if (houseGuests.value === 'any') {
      return data.offer.guests.toString() > 0;
    } else {
      return data.offer.guests.toString() === houseGuests.value;
    }
  };
  var featuresFilter = function (data) {
    var checkedFeatures = houseFeatures.filter(function (feature) {
      return feature.checked;
    });
    var isFeature = true;
    checkedFeatures.forEach(function (feature) {
      if (isFeature && data.offer.features.includes(feature.getAttribute('value'))) {
        isFeature = true;
      } else {
        isFeature = false;
      }
    });
    return isFeature;
  };


  var onFilterChange = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      window.map.cardClose();
    }
    var i = 0;
    var filteredData = window.map.allData.filter(function (data) {
      if (i < PINS_MAX_QUANTITY && homeTypeFilter(data) && priceFilter(data) && roomsFilter(data) && guestsFilter(data) && featuresFilter(data)) {
        i++;
        return homeTypeFilter(data) && priceFilter(data) && roomsFilter(data) && guestsFilter(data) && featuresFilter(data);
      } else {
        return '';
      }
    });
    window.map.appendPins(filteredData);
  };
  filter.addEventListener('change', window.util.debounce(onFilterChange));
})();
