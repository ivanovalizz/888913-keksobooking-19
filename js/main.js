'use strict';

// ---- ПАРАМЕТРЫ ----

var PIN_COUNT = 8;
var availableCheckinAndCheckout = ['12:00', '13:00', '14:00'];
var availableTypes = ['palace', 'flat', 'house', 'bungalo'];
// Закомментено по заданию
/*
var availableTypesDictionary = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
*/
var availableFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var startLocationX = 0;
var START_LOCATION_Y = 130;
var END_LOCATION_Y = 630;
var START_PRICE = 1000;
var END_PRICE = 100000;
var MAX_PHOTO_COUNT = 3;
var MAX_PHOTO = 10;
var MAX_FEATURES = 10;
var MAX_ROOMS = 5;
var MAX_GUESTS = 10;
var MAX_OBJECT = 8;


// ---- DOM ЭЛЕМЕНТЫ ----

var templatePinElement = document.querySelector('#pin').content.querySelector('button');
// Закомментено по заданию
// var templateCard = document.querySelector('#card').content.querySelector('article');
var mapPinMainElement = document.querySelector('.map__pin--main');
var mainFormElement = document.querySelector('.ad-form');


// ---- РАБОТА С ГЕНЕРАЦИЕЙ ДАННЫХ ----

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomAvatar = function (count) {
  return 'img/avatars/user0' + count + '.png';
};

var getRandomLocation = function () {
  var maxLocationX = document.querySelector('.map__overlay').offsetWidth;
  return {
    x: getRandomInt(startLocationX, maxLocationX),
    y: getRandomInt(START_LOCATION_Y, END_LOCATION_Y)
  };
};

var getRandomType = function () {
  return availableTypes[getRandomInt(0, availableTypes.length - 1)];
};

var getRandomCheckinAndCheckout = function () {
  return availableCheckinAndCheckout[getRandomInt(0, availableCheckinAndCheckout.length - 1)];
};

var getRandomFeatures = function (count) {
  var featuresArray = [];
  for (var i = 0; i < count; i++) {
    featuresArray.push(availableFeatures[getRandomInt(0, availableFeatures.length - 1)]);
  }
  return featuresArray;
};

var getRandomPhotos = function (count) {
  var photosArray = [];
  for (var i = 0; i < count; i++) {
    photosArray.push('http://o0.github.io/assets/images/tokyo/hotel' + getRandomInt(1, MAX_PHOTO_COUNT) + '.jpg');
  }
  return photosArray;
};


// ---- РАБОТА С ЗАПОЛНЕНИЕМ DOM ИНФОРМАЦИЕЙ ОБ ОБЪЯВЛЕНИЯХ ----

// Создание DOM элемента метки
var createPinDOMElement = function (data) {
  var element = templatePinElement.cloneNode(true);
  element.style.left = data.location.x + 'px';
  element.style.top = data.location.y + 'px';
  element.querySelector('img').src = data.author.avatar;
  element.querySelector('img').alt = data.offer.title;
  return element;
};

// Добавляет DOM элементы меток на карту
// Создает метки
var createPins = function (count) {
  var adverts = [];

  for (var i = 0; i < count; i++) {
    var location = getRandomLocation();
    adverts.push({
      author: {
        avatar: getRandomAvatar(getRandomInt(1, MAX_OBJECT))
      },
      offer: {
        title: 'Заголовок',
        address: location.x + ', ' + location.y,
        price: getRandomInt(START_PRICE, END_PRICE),
        type: getRandomType(),
        rooms: getRandomInt(1, MAX_ROOMS),
        guests: getRandomInt(1, MAX_GUESTS),
        checkin: getRandomCheckinAndCheckout(),
        checkout: getRandomCheckinAndCheckout(),
        features: getRandomFeatures(getRandomInt(1, MAX_FEATURES)),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis ex eu ex rhoncus, et vulputate dui lobortis. Ut sollicitudin tempus maximus. Donec volutpat justo ac augue porta laoreet.',
        photos: getRandomPhotos(getRandomInt(1, MAX_PHOTO))
      },
      location: location
    });
  }
  return adverts;
};

// Добавляет метки на карту
var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPinDOMElement(pins[i]));
  }
  document.querySelector('.map__pins').appendChild(fragment);
};

// Устанавливает значение параметра или скрывает весь элемент при отсутствии данных

// Закомментено по заданию
/*
var setElementParam = function (element, param, value) {
  if (!value) {
    element.style.display = 'none';
  } else {
    element[param] = value;
  }
};
*/

// Добавляет в карточку фотограции или скрывает весь элемент при отсутствии фотографий
// Закомментено по заданию
/*
var setElementPhotoParam = function (element, source) {
  if (!source.offer.photos) {
    element.querySelector('.popup__photo').style.display = 'none';
  } else {
    var imgFragment = document.createDocumentFragment();
    for (var i = 0; i < source.offer.photos.length; i++) {
      var img = element.querySelector('.popup__photo').cloneNode(true);
      img.src = source.offer.photos[i];
      imgFragment.appendChild(img);
    }
    element.querySelector('.popup__photos').removeChild(element.querySelector('.popup__photo'));
    element.querySelector('.popup__photos').appendChild(imgFragment);
  }
};
*/

// Создает и заполняет карточку
// Закомментено по заданию
/*
var createAndInitCard = function (data) {
  var element = templateCard.cloneNode(true);
  setElementParam(element.querySelector('.popup__avatar'), 'src', data.author.avatar);
  setElementParam(element.querySelector('.popup__title'), 'textContent', data.offer.title);
  setElementParam(element.querySelector('.popup__text--address'), 'textContent', data.offer.address);
  setElementParam(element.querySelector('.popup__text--price'), 'textContent', data.offer.price ? data.offer.price + '₽/ночь' : null);
  setElementParam(element.querySelector('.popup__type'), 'textContent', availableTypesDictionary[data.offer.type]);
  setElementParam(element.querySelector('.popup__text--capacity'), 'textContent', data.offer.rooms && data.offer.guests ? data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей' : null);
  setElementParam(element.querySelector('.popup__text--time'), 'textContent', data.offer.checkin && data.offer.checkout ? 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout : null);
  setElementParam(element.querySelector('.popup__features'), 'textContent', data.offer.features && data.offer.features.length > 0 ? data.offer.features.join(', ') : null);
  setElementParam(element.querySelector('.popup__description'), 'textContent', data.offer.description);
  setElementPhotoParam(element, data);
  return element;
};
*/


// ---- РАБОТА С ФОРМОЙ НОВОГО ОБЪЯВЛЕНИЯ ---

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

var enableForms = function (evt) {
  if (typeof evt === 'object' && evt.button === 0) {
    document.querySelector('.map').classList.remove('map--faded');
    mainFormElement.classList.remove('ad-form--disabled');
    renderPins(createPins(PIN_COUNT));
    toggleFormsState('disabled');
  }
};

// ---- ОГРАНИЧЕНИЯ ПОЛЕЙ ФОРМЫ ----

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

// ---- ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ ----

window.onload = function () {
  disableForms();

  addAddressInputValue();
  mainFormElement.querySelector('#room_number').addEventListener('change', checkValidityInputRooms);
  mapPinMainElement.addEventListener('mousedown', enableForms);
  mainFormElement.querySelector('.ad-form__submit').addEventListener('click', checkValidityInputRooms);
};

// Добавяет карточку
// Закомментено по заданию
// document.querySelector('.map').insertBefore(createAndInitCard(adList[0]), document.querySelector('.map__filters-container'));
