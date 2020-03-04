'use strict';

(function () {
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

  window.pin = {
    createPinDOMElement: createPinDOMElement,
  };
})();
