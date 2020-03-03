'use strict';

(function () {
  var START_PRICE = 1000;
  var END_PRICE = 100000;
  var MAX_PHOTO = 10;
  var MAX_FEATURES = 10;
  var MAX_ROOMS = 5;
  var MAX_GUESTS = 10;
  var MAX_OBJECT = 8;
  var templatePinElement = document.querySelector('#pin').content.querySelector('button');

  // Создание DOM элемента метки
  var createPinDOMElement = function (data, index) {
    var element = templatePinElement.cloneNode(true);
    element.style.left = data.location.x + 'px';
    element.style.top = data.location.y + 'px';
    element.querySelector('img').src = data.author.avatar;
    element.querySelector('img').alt = data.offer.title;
    element.setAttribute('data-index', index);
    return element;
  };

  // Добавляет DOM элементы меток на карту
  // Создает метки
  var createPins = function (count) {
    var adverts = [];

    for (var i = 0; i < count; i++) {
      var location = window.data.getRandomLocation();
      adverts.push({
        author: {
          avatar: window.data.getRandomAvatar(window.data.getRandomInt(1, MAX_OBJECT))
        },
        offer: {
          title: 'Заголовок',
          address: location.x + ', ' + location.y,
          price: window.data.getRandomInt(START_PRICE, END_PRICE),
          type: window.data.getRandomType(),
          rooms: window.data.getRandomInt(1, MAX_ROOMS),
          guests: window.data.getRandomInt(1, MAX_GUESTS),
          checkin: window.data.getRandomCheckinAndCheckout(),
          checkout: window.data.getRandomCheckinAndCheckout(),
          features: window.data.getRandomFeatures(window.data.getRandomInt(1, MAX_FEATURES)),
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis ex eu ex rhoncus, et vulputate dui lobortis. Ut sollicitudin tempus maximus. Donec volutpat justo ac augue porta laoreet.',
          photos: window.data.getRandomPhotos(window.data.getRandomInt(1, MAX_PHOTO))
        },
        location: location
      });
    }
    return adverts;
  };

  window.pin = {
    createPinDOMElement: createPinDOMElement,
    createPins: createPins,
  };
})();
