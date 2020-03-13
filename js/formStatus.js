'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');


  var messageClickClose = function (evt) {
    var successMessage = main.querySelector('.success');
    var errorMessage = main.querySelector('.error');
    if (successMessage && (evt.target === successMessage)) {
      successMessage.remove();
    }
    if (errorMessage) {
      var errorMessageButton = errorMessage.querySelector('.error__button');
      if (evt.target === errorMessage || evt.target === errorMessageButton) {
        errorMessage.remove();
      }
    }
  };
  var messageEscapePressClose = function () {
    var successMessage = main.querySelector('.success');
    var errorMessage = main.querySelector('.error');
    if (successMessage) {
      successMessage.remove();
    } else if (errorMessage) {
      errorMessage.remove();
    }
  };
  var onMessageEscapePress = function (evt) {
    window.util.isEscapeEvent(evt, messageEscapePressClose);
  };


  var renderSuccessMessage = function () {
    var successElement = successTemplate.cloneNode(true);
    main.append(successElement);
    document.addEventListener('click', messageClickClose);
    window.addEventListener('keydown', onMessageEscapePress);
  };
  var renderErrorMessage = function () {
    var errorElement = errorTemplate.cloneNode(true);
    main.append(errorElement);
    document.addEventListener('click', messageClickClose);
    window.addEventListener('keydown', onMessageEscapePress);
  };


  window.formStatus = {
    renderSuccessMessage: renderSuccessMessage,
    renderErrorMessage: renderErrorMessage
  };
})();
