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
  var numberSelectsFilter = function (target, data) {
    if (target.value === 'any') {
      return data > 0;
    } else {
      return data.toString() === target.value;
    }
  };
  var featuresFilter = function (data) {
    var checkedFeatures = houseFeatures.filter(function (feature) {
      return feature.checked;
    });
    var isFeatureChecked = true;
    checkedFeatures.forEach(function (feature) {
      isFeatureChecked = isFeatureChecked && data.offer.features.includes(feature.getAttribute('value')) ? true : false;
    });
    return isFeatureChecked;
  };


  var onFilterChange = function () {
    var mapCard = document.querySelector('.map__card');
    var filteredData = [];

    if (mapCard) {
      window.map.cardClose();
    }
    for (var i = 0; i < window.map.allData.length && filteredData.length < window.map.PINS_MAX_QUANTITY; i++) {
      var data = window.map.allData[i];
      if (homeTypeFilter(data) && priceFilter(data) && numberSelectsFilter(houseRooms, data.offer.rooms) &&
          numberSelectsFilter(houseGuests, data.offer.guests) && featuresFilter(data)) {
        filteredData.push(data);
      }
    }
    window.map.appendPins(filteredData);
  };
  filter.addEventListener('change', window.util.debounce(onFilterChange));
})();
