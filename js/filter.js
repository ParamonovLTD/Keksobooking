'use strict';

(function () {
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
    switch (houseRooms.value) {
      case '1':
        return data.offer.rooms === 1;
      case '2':
        return data.offer.rooms === 2;
      case '3':
        return data.offer.rooms === 3;
      default:
        return data.offer.rooms > 0;
    }
  };
  var guestsFilter = function (data) {
    switch (houseGuests.value) {
      case '2':
        return data.offer.guests === 2;
      case '1':
        return data.offer.guests === 1;
      case '0':
        return data.offer.guests === 0;
      default:
        return data.offer.guests > 0;
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
    var filteredData = window.map.allData.filter(function (data) {
      return homeTypeFilter(data) && priceFilter(data) && roomsFilter(data) && guestsFilter(data) && featuresFilter(data);
    });
    window.map.appendPins(filteredData);
  };
  filter.addEventListener('change', window.util.debounce(onFilterChange));
})();
