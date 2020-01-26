'use strict';

var countOfObjects = 8;
var availableCheckinAndCheckout = ['12:00', '13:00', '14:00'];
var availableTypes = ['palace', 'flat', 'house', 'bungalo'];
var availableFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var objectsArray = [];

var template = document.querySelector('#pin').content.querySelector('button');
var fragment = document.createDocumentFragment();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getRandomAvatar = function () {
  return 'img/avatars/user0' + getRandomInt(1, 8) + '.png';
};

var getRandomLocation = function () {
  var maxX = document.querySelector('.map__overlay').offsetWidth;
  return {
    x: getRandomInt(0, maxX),
    y: getRandomInt(130, 630)
  };
};

var getRandomType = function () {
  return availableTypes[getRandomInt(0, availableTypes.length - 1)];
};

var getRandomCheckinAndCheckout = function () {
  return availableCheckinAndCheckout[getRandomInt(0, availableCheckinAndCheckout.length - 1)];
};

var getRandomFeatures = function () {
  var featuresArray = [];
  var arrayLength = getRandomInt(1, 10);
  for (var i = 0; i < arrayLength; i++) {
    featuresArray.push(availableFeatures[getRandomInt(0, availableFeatures.length - 1)]);
  }
  return featuresArray;
};

var getRandomPhotos = function () {
  var photosArray = [];
  var arrayLength = getRandomInt(1, 10);
  for (var i = 0; i < arrayLength; i++) {
    photosArray.push('http://o0.github.io/assets/images/tokyo/hotel' + getRandomInt(1, 3) + '.jpg');
  }
  return photosArray;
};

var getRandomObject = function () {
  var location = getRandomLocation();
  return {
    author: {
      avatar: getRandomAvatar()
    },
    offer: {
      title: 'Заголовок',
      address: location.x + ', ' + location.y,
      price: getRandomInt(1000, 100000),
      type: getRandomType(),
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 10),
      checkin: getRandomCheckinAndCheckout(),
      checkout: getRandomCheckinAndCheckout(),
      features: getRandomFeatures(),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis ex eu ex rhoncus, et vulputate dui lobortis. Ut sollicitudin tempus maximus. Donec volutpat justo ac augue porta laoreet. Suspendisse quis varius lectus. Pellentesque placerat fermentum lacus id malesuada. Curabitur sit amet turpis quis elit accumsan lobortis nec eget sapien. Etiam consectetur consectetur tortor, quis scelerisque diam. Nam sodales placerat tempus.',
      photos: getRandomPhotos()
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
