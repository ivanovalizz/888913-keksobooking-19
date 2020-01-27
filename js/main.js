'use strict';

var countOfObjects = 8;
var availableCheckinAndCheckout = ['12:00', '13:00', '14:00'];
var availableTypes = ['palace', 'flat', 'house', 'bungalo'];
var availableFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var startLocationX = 0;
var startLocationY = 130;
var endLocationY = 630;
var startPrice = 1000;
var endPrice = 100000;
var objectsArray = [];

var template = document.querySelector('#pin').content.querySelector('button');
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
    photosArray.push('http://o0.github.io/assets/images/tokyo/hotel' + getRandomInt(1, 3) + '.jpg');
  }
  return photosArray;
};

var getRandomObject = function () {
  var location = getRandomLocation();
  return {
    author: {
      avatar: getRandomAvatar(getRandomInt(1, 8))
    },
    offer: {
      title: 'Заголовок',
      address: location.x + ', ' + location.y,
      price: getRandomInt(startPrice, endPrice),
      type: getRandomType(),
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 10),
      checkin: getRandomCheckinAndCheckout(),
      checkout: getRandomCheckinAndCheckout(),
      features: getRandomFeatures(getRandomInt(1, 10)),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis ex eu ex rhoncus, et vulputate dui lobortis. Ut sollicitudin tempus maximus. Donec volutpat justo ac augue porta laoreet. Suspendisse quis varius lectus. Pellentesque placerat fermentum lacus id malesuada. Curabitur sit amet turpis quis elit accumsan lobortis nec eget sapien. Etiam consectetur consectetur tortor, quis scelerisque diam. Nam sodales placerat tempus.',
      photos: getRandomPhotos(getRandomInt(1, 10))
    },
    location: location
  };
};

var createDOMElement = function (data) {
  var element = template.cloneNode(true);
  element.style.left = data.location.x - 65 / 2 + 'px';
  element.style.top = data.location.y - 65 - 22 + 'px';
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

createObjectsArray(countOfObjects);
document.querySelector('.map__pins').appendChild(fragment);
document.querySelector('.map').classList.remove('map--faded');
