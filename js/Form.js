'use strict';
(function () {

  /** Настройки для формы. */
  var Config = {
    200: {
      MESSAGE: 'Ура! Объявление успешно отправлено!',
      IS_SUCCESS: true
    },
    400: {
      MESSAGE: 'Ошибка! Проблема с адресом отправки. Попробуйте снова чуть позже.',
      IS_SUCCESS: false
    },
    401: {
      MESSAGE: 'Ошибка! Вы не авторизованы. Зарегестрируйтесь или войдите под своим логином и поробуйте снова.',
      IS_SUCCESS: false
    },
    403: {
      MESSAGE: 'Вам запрещено отправлять объявление. Свяжитесь с администратором или поробуйте снова позже.',
      IS_SUCCESS: false
    },
    404: {
      MESSAGE: 'Ошибка! Ошибка сервера. Возможно, ведутся работы. Попробуйте снова чуть позже.',
      IS_SUCCESS: false
    },
    500: {
      MESSAGE: 'Ошибка! Проверьте введённые данные и повторите отправку объявления.',
      IS_SUCCESS: false
    },
    0: {
      MESSAGE: 'Ошибка! Возможно, у Вас пропал интернет или у нас упал сервер.',
      IS_SUCCESS: false
    },
    TIMEOUT: {
      MS: 10000,
      MESSAGE: 'УПС: Время ожидания прошло. Проверьте скорость интернета.'
    },
    UNKNOW_ERROR: 'Неизвестная ошибка! Перезагрузите сайт.'
  };
  function Form(diactivateMap) {
    this.diactivateMap = diactivateMap;
    this.config = Config;
    this.form = document.querySelector('.ad-form');
    this.input = {
      title: this.form.querySelector('#title'),
      address: this.form.querySelector('#address'),
      type: this.form.querySelector('#type'),
      price: this.form.querySelector('#price'),
      timein: this.form.querySelector('#timein'),
      timeout: this.form.querySelector('#timeout'),
      rooms: this.form.querySelector('#room_number'),
      capacity: this.form.querySelector('#capacity')
    };
    this.sendButton = this.form.querySelector('.ad-form__submit');
    this.onFormSubmit = this.submit.bind(this);
    this.disable();
  }

  Form.prototype.disable = function () {
    this.fieldsets = this.form.querySelectorAll('fieldset');
    this.sendButton.toggleAttribute('disabled', true);
    this.form.classList.toggle('ad-form--disabled', true);

    for (var i = 0; i < this.fieldsets.length; i++) {
      var _fieldset = this.fieldsets[i];
      _fieldset.setAttribute('disabled', true);
    }
  };

  Form.prototype.enable = function () {
    this.onFormSubmit = this.submit.bind(this);
    this.form.addEventListener('submit', this.onFormSubmit);
    this.form.classList.toggle('ad-form--disabled', false);
    this.sendButton.toggleAttribute('disabled', false);

    this.validity = new window.Validity(this.input);
    this.validity.init();

    for (var i = 0; i < this.fieldsets.length; i++) {
      var _fieldset = this.fieldsets[i];
      _fieldset.removeAttribute('disabled');
    }
  };

  Form.prototype.setAddress = function (x, y) {
    this.input.address.value = Math.floor(x) + ', ' + Math.floor(y);
  };

  Form.prototype.submit = function (evt) {
    evt.preventDefault();
    this.validity.checkAll();
    this.upload = new window.Upload(this);
    // this.backend.upload(this);
    if (this.validity.isValid) {
      this.sendButton.toggleAttribute('disabled', true);
      this.form.reset();
    }
  };

  Form.prototype.showMessage = function (message, result) {
    this.main = document.querySelector('main');

    this.messageTemplate = document.querySelector('#' + result).cloneNode(true).content;

    this.messageTemplate.querySelector('.' + result + '__message').textContent = message;

    this.onKeydown = this.keydown.bind(this);
    this.onCloseButtonClick = this.hideMessage.bind(this);

    if (result === 'error') {
      this.closeButton = this.messageTemplate.querySelector('.error__button');
      this.closeButton.addEventListener('click', this.onCloseButtonClick);
    }

    this.main.appendChild(this.messageTemplate);
    document.addEventListener('keydown', this.onKeydown);
  };

  Form.prototype.hideMessage = function () {
    var _rules = this.form.querySelectorAll('.rule');
    _rules.forEach(function (rule) {
      rule.remove();
    });
    for (var element in this.input) {
      if (this.input.hasOwnProperty(element)) {
        this.input[element].style = 'box-shadow: initial; outline: initial;';
      }
    }
    if (this.closeButton) {
      this.closeButton.removeEventListener('click', this.onCloseButtonClick);
    }
    this.main.lastElementChild.remove();
    this.diactivateMap();
    document.removeEventListener('keydown', this.onKeydown);
  };

  Form.prototype.keydown = function (evt) {
    if (evt.keyCode === window.utils.keycode.ESC) {
      this.hideMessage();
    }
  };

  window.Form = Form;
})();
