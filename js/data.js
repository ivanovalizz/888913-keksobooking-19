'use strict';

(function () {
  var availableTypes = ['palace', 'flat', 'house', 'bungalo'];
  var availableFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var startLocationX = 0;
  var START_LOCATION_Y = 130;
  var END_LOCATION_Y = 630;
  var MAX_PHOTO_COUNT = 3;
  var START_PRICE = 1000;
  var END_PRICE = 100000;
  var MAX_PHOTO = 10;
  var MAX_FEATURES = 10;
  var MAX_ROOMS = 5;
  var MAX_GUESTS = 10;
  var MAX_OBJECT = 8;

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
          checkin: window.form.getRandomCheckinAndCheckout(),
          checkout: window.form.getRandomCheckinAndCheckout(),
          features: window.data.getRandomFeatures(getRandomInt(1, MAX_FEATURES)),
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis ex eu ex rhoncus, et vulputate dui lobortis. Ut sollicitudin tempus maximus. Donec volutpat justo ac augue porta laoreet.',
          photos: getRandomPhotos(getRandomInt(1, MAX_PHOTO))
        },
        location: location
      });
    }
    return adverts;
  };

  window.data = {
    getRandomInt: getRandomInt,
    getRandomAvatar: getRandomAvatar,
    getRandomLocation: getRandomLocation,
    getRandomType: getRandomType,
    getRandomFeatures: getRandomFeatures,
    getRandomPhotos: getRandomPhotos,
    createPins: createPins,
  };
})();
