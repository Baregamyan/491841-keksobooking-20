'use strict';

var MOCKS_QUANTITY = 8;

/** Конструктор карты. */
function Landscape() {
  this.landscape = document.querySelector('.map');
  this.pin = this.landscape.querySelector('.map__pin--main');

  this.isCardOpen = false;
  this.onPinClick = this.init.bind(this);
  this.pin.addEventListener('click', this.onPinClick);
}

/** Инициализирует карту. */
Landscape.prototype.init = function () {
  this.renderOffers(this.getMocks(MOCKS_QUANTITY));
};

/**
 * Генерирует и возвращает моки.
 * @param {number} quantity - Количество моков.
 * @return {Array} - Моки.
 */
Landscape.prototype.getMocks = function (quantity) {
  this.quantity = quantity || 8;
  var mocks = [];
  for (var i = 0; i < this.quantity; i++) {
    var mock = new window.Mock(i);
    mocks.push(mock);
  }
  return mocks;
};

/**
 * Отрисовывает объявления.
 * @param {Array} offers - Объявления.
 */
Landscape.prototype.renderOffers = function (offers) {
  var _container = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    var offer = offers[i];
    var pin = new window.Pin(offer.offer.title, offer.author.avatar, offer.location.x, offer.location.y);
    var onPinClick = this.showCard.bind(this, offer);
    pin.addEventListener('click', onPinClick);
    fragment.appendChild(pin);
  }
  _container.appendChild(fragment);
};

/**
 * Показывает карточку с описанием объявления.
 * @param {Array} data - Данные объявления.
 */
Landscape.prototype.showCard = function (data) {
  this.card = new window.Card(data);
  if (this.isCardOpen) {
    this.closeCard.bind(this);
  }
  this.card.show(this.landscape);

  this.isCardOpen = true;
};

/** Закрывает карточку с описанием объявления. */
Landscape.prototype.closeCard = function () {
  this.isCardOpen = false;
  this.card.hide(this.landscape);
};

window.Landscape = Landscape;


