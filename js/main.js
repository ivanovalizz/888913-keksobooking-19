'use strict';

var countOfObjects = 8;
var availableCheckinAndCheckout = ['12:00', '13:00', '14:00'];
var availableTypes = ['palace', 'flat', 'house', 'bungalo'];
var availableTypesDictionary = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var availableFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var startLocationX = 0;
var startLocationY = 130;
var endLocationY = 630;
var startPrice = 1000;
var endPrice = 100000;
var maxCountOfPhoto = 3;
var maxPhoto = 10;
var maxFeatures = 10;
var maxRoom = 5;
var maxGuests = 10;
var maxObject = 8;
var objectsArray = [];

var templatePin = document.querySelector('#pin').content.querySelector('button');
var templateCard = document.querySelector('#card').content.querySelector('article');
var fragment = document.createDocumentFragment();

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
    y: getRandomInt(startLocationY, endLocationY)
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
    photosArray.push('http://o0.github.io/assets/images/tokyo/hotel' + getRandomInt(1, maxCountOfPhoto) + '.jpg');
  }
  return photosArray;
};

var getRandomObject = function () {
  var location = getRandomLocation();
  return {
    author: {
      avatar: getRandomAvatar(getRandomInt(1, maxObject))
    },
    offer: {
      title: 'Заголовок',
      address: location.x + ', ' + location.y,
      price: getRandomInt(startPrice, endPrice),
      type: getRandomType(),
      rooms: getRandomInt(1, maxRoom),
      guests: getRandomInt(1, maxGuests),
      checkin: getRandomCheckinAndCheckout(),
      checkout: getRandomCheckinAndCheckout(),
      features: getRandomFeatures(getRandomInt(1, maxFeatures)),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis ex eu ex rhoncus, et vulputate dui lobortis. Ut sollicitudin tempus maximus. Donec volutpat justo ac augue porta laoreet.',
      photos: getRandomPhotos(getRandomInt(1, maxPhoto))
    },
    location: location
  };
};

var createDOMElement = function (data) {
  var element = templatePin.cloneNode(true);
  element.style.left = data.location.x + 'px';
  element.style.top = data.location.y + 'px';
  element.querySelector('img').src = data.author.avatar;
  element.querySelector('img').alt = data.offer.title;
  return element;
};

var createObjectsArray = function (count) {
  for (var i = 0; i < count; i++) {
    var createdObject = getRandomObject();
    objectsArray.push(createdObject);
    fragment.appendChild(createDOMElement(createdObject));
  }
};

var initDOMObject = function (element, param, value) {
  if (!value) {
    element.style.display = 'none';
  } else {
    element[param] = value;
  }
};

var createCardDOMElement = function (data) {
  var element = templateCard.cloneNode(true);
  initDOMObject(element.querySelector('.popup__avatar'), 'src', data.author.avatar);
  initDOMObject(element.querySelector('.popup__title'), 'textContent', data.offer.title);
  initDOMObject(element.querySelector('.popup__text--address'), 'textContent', data.offer.address);
  initDOMObject(element.querySelector('.popup__text--price'), 'textContent', data.offer.price ? data.offer.price + '₽/ночь' : null);
  initDOMObject(element.querySelector('.popup__type'), 'textContent', availableTypesDictionary[data.offer.type]);
  initDOMObject(element.querySelector('.popup__text--capacity'), 'textContent', data.offer.rooms && data.offer.guests ? data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей' : null);
  initDOMObject(element.querySelector('.popup__text--time'), 'textContent', data.offer.checkin && data.offer.checkout ? 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout : null);
  initDOMObject(element.querySelector('.popup__features'), 'textContent', data.offer.features && data.offer.features.length > 0 ? data.offer.features.join(', ') : null);
  initDOMObject(element.querySelector('.popup__description'), 'textContent', data.offer.description);

  if (!data.offer.photos) {
    element.querySelector('.popup__photo').style.display = 'none';
  } else {
    var imgFragment = document.createDocumentFragment();
    for (var i = 0; i < data.offer.photos.length; i++) {
      var img = element.querySelector('.popup__photo').cloneNode(true);
      img.src = data.offer.photos[i];
      imgFragment.appendChild(img);
    }
    element.querySelector('.popup__photos').removeChild(element.querySelector('.popup__photo'));
    element.querySelector('.popup__photos').appendChild(imgFragment);
  }

  return element;
};

createObjectsArray(countOfObjects);
document.querySelector('.map__pins').appendChild(fragment);
document.querySelector('.map').classList.remove('map--faded');
document.querySelector('.map').insertBefore(createCardDOMElement(objectsArray[0]), document.querySelector('.map__filters-container'));
