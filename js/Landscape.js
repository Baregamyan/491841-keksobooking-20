'use strict';
(function () {
  var MOCKS_QUANTITY = 8;

  var Config = {
    COORDS_LIMIT: {
      Y: {
        MIN: 130,
        MAX: 630
      }
    }
  };

  /** Конструктор карты. */
  function Landscape() {
    this.config = Config;
    this.landscape = document.querySelector('.map');
    this.pin = {
      element: this.landscape.querySelector('.map__pin--main'),
      getX: function () {
        return this.element.offsetLeft;
      },
      getY: function () {
        return this.element.offsetTop;
      },
      changePosition: function (shift, container, config) {
        var Coord = {
          x: this.getX() - shift.x,
          y: this.getY() - shift.y
        };
        if (Coord.x < 0) {
          Coord.x = 0;
        } else if (Coord.x > container.offsetWidth - this.element.offsetWidth) {
          Coord.x = container.offsetWidth - this.element.offsetWidth;
        }
        if (Coord.y < config.Y.MIN) {
          Coord.y = config.Y.MIN;
        } else if (Coord.y > config.Y.MAX) {
          Coord.y = config.Y.MAX;
        }

        this.element.style.top = Coord.y + 'px';
        this.element.style.left = Coord.x + 'px';
      }
    };
    this.isCardOpen = false;

    this.onPinClick = this.click.bind(this);
    this.onPinKeydown = this.keydown.bind(this);

    this.pin.element.addEventListener('click', this.onPinClick);
    this.pin.element.addEventListener('keydown', this.onPinKeydown);

    this.form = new window.Form(this);
    this.form.disable.bind(this);
    this.form.setAddress(this.pin.getX(), this.pin.getY(true));

    this.get = new window.Get(this);
  }

  Landscape.prototype.click = function (evt) {
    evt.preventDefault();

    this.onPinMousedown = this.mousedown.bind(this);
    this.pin.element.addEventListener('mousedown', this.onPinMousedown);
    this.activate();
  };

  Landscape.prototype.mousedown = function (evt) {
    evt.preventDefault();

    this.startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    this.onMousemove = this.mousemove.bind(this);
    this.onMouseup = this.mouseup.bind(this);

    document.addEventListener('mousemove', this.onMousemove);
    document.addEventListener('mouseup', this.onMouseup);
  };

  Landscape.prototype.mousemove = function (evtMove) {
    evtMove.preventDefault();
    var shift = {
      x: this.startCoords.x - evtMove.clientX,
      y: this.startCoords.y - evtMove.clientY
    };

    this.startCoords = {
      x: evtMove.clientX,
      y: evtMove.clientY
    };

    this.onMouseup = this.mouseup.bind(this);
    document.addEventListener('mouseup', this.onMouseup);

    this.pin.changePosition(shift, this.landscape, this.config.COORDS_LIMIT);
    this.form.setAddress(this.pin.getX() + (this.pin.element.offsetWidth / 2), this.pin.getY() + (this.pin.element.offsetHeight));
  };

  Landscape.prototype.mouseup = function (evtUp) {
    evtUp.preventDefault();

    document.removeEventListener('mousemove', this.onMousemove);
    document.removeEventListener('mouseup', this.onMouseup);
  };

  Landscape.prototype.activate = function () {
    this.pin.element.removeEventListener('click', this.onPinClick);
    this.landscape.classList.toggle('map--faded', false);
    this.form.enable();
    this.form.setAddress(this.pin.getX(), this.pin.getY());
    this.renderOffers(this.getMocks());
  };

  Landscape.prototype.deactivate = function () {
    this.pin.element.addEventListener('click', this.onPinClick);
    this.landscape.classList.toggle('map--faded', true);
    var _offers = this.landscape.querySelectorAll('.map__pin:not(.map__pin--main)');
    _offers.forEach(function (offer) {
      offer.remove();
    });
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

  /**
   * Слушатель нажатия клавиши.
   * @param {KeyboardEvent} evt - Событие нажатия клавиши.
   */
  Landscape.prototype.keydown = function (evt) {
    if (evt.keyCode === window.utils.ENTER) {
      this.init.bind(this);
    }
  };

  window.Landscape = Landscape;
})();
