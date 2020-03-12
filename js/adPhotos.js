'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
  var fileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var adPhotos = document.querySelector('.ad-form__photo');


  var onFileChooserChange = function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });
    if (matches) {
      var reader = new FileReader();
      var img = document.createElement('img');
      reader.addEventListener('load', function () {
        adPhotos.append(img);
        var image = adPhotos.querySelector('img');
        image.setAttribute('src', reader.result);
        image.style.width = '100%';
        image.style.height = '100%';
      });
      reader.readAsDataURL(file);
    }
  };


  var adPhotosChange = function () {
    fileChooser.addEventListener('change', onFileChooserChange);
  };
  adPhotosChange();
})();
