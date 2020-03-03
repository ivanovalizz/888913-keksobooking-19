'use strict';

// ---- ПАРАМЕТРЫ ----

var PIN_COUNT = 8;
var pinsObjectsArr = [];

var mapElement = document.querySelector('.map');
var mapPinMainElement = document.querySelector('.map__pin--main');
var mainFormElement = document.querySelector('.ad-form');
var isActivePage = false;

var activatePage = function () {
  if (!isActivePage) {
    mapElement.classList.remove('map--faded'); // Активация карты

    mainFormElement.classList.remove('ad-form--disabled'); // Активация формы
    window.form.toggleFormsState('disabled');

    pinsObjectsArr = window.pin.createPins(PIN_COUNT);
    window.map.renderPins(pinsObjectsArr); // Отрисовка пинов на карте
    window.form.subscribeOnPinButtonsClick(pinsObjectsArr); // Подписка на клик по пинам для открытия карточки

    isActivePage = true;
  }
};

window.onload = function () {
  window.form.disableForms();

  window.form.addAddressInputValue();
  mainFormElement.querySelector('#room_number').addEventListener('change', window.form.checkValidityInputRooms);
  mainFormElement.querySelector('#type').addEventListener('change', window.form.checkValiditySelectType);
  mapPinMainElement.addEventListener('mousedown', activatePage);
  mainFormElement.querySelector('.ad-form__submit').addEventListener('click', window.form.checkValidityInputRooms);
  mainFormElement.querySelector('.ad-form__submit').addEventListener('click', window.form.checkValiditySelectType);
};
