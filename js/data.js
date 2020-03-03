'use strict';

(function () {
  var availableCheckinAndCheckout = ['12:00', '13:00', '14:00'];
  var availableTypes = ['palace', 'flat', 'house', 'bungalo'];
  var availableFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var startLocationX = 0;
  var START_LOCATION_Y = 130;
  var END_LOCATION_Y = 630;
  var MAX_PHOTO_COUNT = 3;

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

  window.data = {
    getRandomInt: getRandomInt,
    getRandomAvatar: getRandomAvatar,
    getRandomLocation: getRandomLocation,
    getRandomType: getRandomType,
    getRandomCheckinAndCheckout: getRandomCheckinAndCheckout,
    getRandomFeatures: getRandomFeatures,
    getRandomPhotos: getRandomPhotos,
  };
})();
