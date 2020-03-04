'use strict';

(function () {
  var availableTypesDictionary = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var templateCard = document.querySelector('#card').content.querySelector('article');

  // Устанавливает значение параметра или скрывает весь элемент при отсутствии данных
  var setElementParam = function (element, param, value) {
    if (!value) {
      element.style.display = 'none';
    } else {
      element[param] = value;
    }
  };

  // Добавляет в карточку фотографии или скрывает весь элемент при отсутствии фотографий
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

  // Создает и заполняет карточку
  var renderCardElement = function (data) {
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

  window.card = {
    renderCardElement: renderCardElement,
  };
})();
