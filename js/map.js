'use strict';

(function () {
  // Добавляет метки на карту
  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(window.pin.createPinDOMElement(pins[i], i));
    }
    document.querySelector('.map__pins').appendChild(fragment);
  };

  window.map = {
    renderPins: renderPins,
  };
})();
