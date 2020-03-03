'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;

  var mapPinMainElement = document.querySelector('.map__pin--main');
  var mapElement = document.querySelector('.map');
  var mainFormElement = document.querySelector('.ad-form');

  var addAddressInputValue = function () {
    document.querySelector('#address').value = mapPinMainElement.offsetTop + ', ' + mapPinMainElement.offsetLeft;
  };

  // Добавляет или убирает атрибут списку элементов
  var toggleElementsAttribute = function (elements, name, value) {
    for (var i = 0; i < elements.length; i++) {
      if (value) {
        elements[i].setAttribute(name, value);
      } else {
        elements[i].removeAttribute(name);
      }
    }
  };

  // Меняет состояние полей формы (disabled / enabled)
  var toggleFormsState = function (name, value) {
    toggleElementsAttribute(document.querySelector('.map__filters').querySelectorAll('select'), name, value);
    toggleElementsAttribute(document.querySelector('.map__filters').querySelectorAll('input'), name, value);
    toggleElementsAttribute(mainFormElement.querySelectorAll('input'), name, value);
    toggleElementsAttribute(mainFormElement.querySelectorAll('select'), name, value);
    toggleElementsAttribute(mainFormElement.querySelectorAll('textarea'), name, value);
    toggleElementsAttribute(mainFormElement.querySelectorAll('button'), name, value);
  };

  var disableForms = function () {
    toggleFormsState('disabled', 'true');
  };

  var closeCard = function () {
    var newCardElement = mapElement.querySelector('.map__card');
    if (newCardElement) {
      mapElement.removeChild(newCardElement);
    }
  };

  var subscribeOnPinButtonsClick = function (pinsObjectsArr) {
    var pinsButtons = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    pinsButtons.forEach(function (item) {
      item.addEventListener('click', function (e) {
        var oldCardElement = mapElement.querySelector('.map__card');
        if (oldCardElement) {
          mapElement.removeChild(oldCardElement);
        }

        var index = e.currentTarget.getAttribute('data-index');
        mapElement.insertBefore(window.card.renderCardElement(pinsObjectsArr[parseInt(index, 10)]), document.querySelector('.map__filters-container'));

        mapElement.querySelector('.map__card .popup__close').addEventListener('click', closeCard);
        document.addEventListener('keydown', function (event) {
          if (event && event.code === 'Escape') {
            closeCard();
          }
        });
      });
    });
  };

  // ---- ОГРАНИЧЕНИЯ ПОЛЕЙ ФОРМЫ ----

  // Заполнение полей 'Количество комнат' и 'Количество гостей'
  var checkValidityInputRooms = function () {
    var roomsSelect = mainFormElement.querySelector('#room_number');
    var capacitySelect = mainFormElement.querySelector('#capacity');

    var capacitySelectValue0 = capacitySelect.querySelector('option[value="0"]');
    var capacitySelectValue1 = capacitySelect.querySelector('option[value="1"]');
    var capacitySelectValue2 = capacitySelect.querySelector('option[value="2"]');
    var capacitySelectValue3 = capacitySelect.querySelector('option[value="3"]');

    capacitySelectValue3.removeAttribute('disabled');
    capacitySelectValue2.removeAttribute('disabled');
    capacitySelectValue1.removeAttribute('disabled');
    capacitySelectValue0.removeAttribute('disabled');

    if (roomsSelect.value === '1') {
      capacitySelectValue3.setAttribute('disabled', 'true');
      capacitySelectValue2.setAttribute('disabled', 'true');
      capacitySelectValue0.setAttribute('disabled', 'true');
    }

    if (roomsSelect.value === '2') {
      capacitySelectValue3.setAttribute('disabled', 'true');
      capacitySelectValue0.setAttribute('disabled', 'true');
    }

    if (roomsSelect.value === '3') {
      capacitySelectValue0.setAttribute('disabled', 'true');
    }

    if (roomsSelect.value === '100') {
      capacitySelectValue3.setAttribute('disabled', 'true');
      capacitySelectValue2.setAttribute('disabled', 'true');
      capacitySelectValue1.setAttribute('disabled', 'true');
    }
  };

  // Проверка поля 'Заголовок объявления' на валидность
  var inputTitle = document.querySelector('#title');

  inputTitle.addEventListener('invalid', function () {
    if (inputTitle.validity.tooShort) {
      inputTitle.setCustomValidity('Имя должно состоять минимум из 30 символов');
    } else if (inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity('Имя не должно превышать 100 символов');
    } else if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity('Обязательное поле');
    } else {
      inputTitle.setCustomValidity('');
    }
  });

  inputTitle.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < MIN_TITLE_LENGTH) {
      target.setCustomValidity('Имя должно состоять минимум из ' + MIN_TITLE_LENGTH + '-х символов');
    } else {
      target.setCustomValidity('');
    }
  });

  // Проверка полей 'Тип жилья' и 'Зена за ночь' на валидность
  var checkValiditySelectType = function () {
    var inputPrice = document.querySelector('#price');
    var selectType = document.querySelector('#type');

    switch (selectType.value) {
      case 'bungalo': {
        inputPrice.setAttribute('placeholder', '0');
        inputPrice.setAttribute('min', '0');
        return;
      }
      case 'flat': {
        inputPrice.setAttribute('placeholder', '1000');
        inputPrice.setAttribute('min', '1000');
        return;
      }
      case 'house': {
        inputPrice.setAttribute('placeholder', '5000');
        inputPrice.setAttribute('min', '5000');
        return;
      }
      case 'palace': {
        inputPrice.setAttribute('placeholder', '10000');
        inputPrice.setAttribute('min', '10000');
        return;
      }
      default: {
        inputPrice.setAttribute('placeholder', '5000');
        inputPrice.setAttribute('min', '0');
      }
    }
  };

  window.form = {
    addAddressInputValue: addAddressInputValue,
    toggleFormsState: toggleFormsState,
    disableForms: disableForms,
    subscribeOnPinButtonsClick: subscribeOnPinButtonsClick,
    checkValidityInputRooms: checkValidityInputRooms,
    checkValiditySelectType: checkValiditySelectType,
  };
})();
