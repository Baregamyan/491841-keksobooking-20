'use strict';

/**
 * Конструкор отметки на карте.
 * Возвращает HTML-элемент отметки.
 * @param {Object} data - Данные для создания отметки.
 * @param {string} data.offer.title - Заголовок объявления.
 * @param {string} data.author.avatar - Ссылка за аватар автора объявления.
 * @param {number} data.location.x - Положение метки на карте по горизонтали.
 * @param {number} data.location.y - Положение метки на карте по вертикали.
 * @return {HTMLElement}
 */
function Pin(data) {
  this.template = document.querySelector('#pin').cloneNode(true);
  this.pin = this.template.content.querySelector('.map__pin');
  this.title = data.offer.title;
  this.avatar = data.author.avatar;
  this.location = {
    x: data.location.x + (this.pin.offsetWidth / 2),
    y: data.location.y - this.pin.offsetHeight
  };

  this.pin.style.left = this.location.x + 'px';
  this.pin.style.top = this.location.y + 'px';
  this.pin.firstElementChild.setAttribute('src', this.avatar);
  this.pin.firstElementChild.setAttribute('alt', this.title);

  return this.pin;
}

window.Pin = Pin;
