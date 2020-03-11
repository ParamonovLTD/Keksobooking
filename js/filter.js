'use strict';

(function () {
  var filter = document.querySelector('.map__filters');
  var houseType = filter.querySelector('#housing-type');


  var onHouseTypeChange = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      window.map.cardClose();
    }
    var houseTypeValue = houseType.value;
    var filteredData = window.map.allData.filter(function (data) {
      return data.offer.type === houseTypeValue;
    });
    window.map.appendPins(filteredData);
  };
  houseType.addEventListener('change', onHouseTypeChange);
})();
