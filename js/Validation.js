'use strict';
(function () {

  var Config = {
    LENGTH: {
      MIN: 30,
      MAX: 100,
      getRule: function (type) {
        if (type === 'min') {
          return 'Поле не должно содержать меньше ' + this.MIN + ' символов.';
        } else {
          return 'Поле не должно привышать ' + this.MAX + ' символов.';
        }
      }
    },
    PRICE: {
      BUNGALO: {
        MIN: 0,
        MAX: 1000000,
        getRule: function (type) {
          if (type === 'min') {
            return 'Цена не должна быть меньше ' + this.MIN + '.';
          } else {
            return 'Цена не должна быть больше ' + this.MAX + '.';
          }
        }
      },
      FLAT: {
        MIN: 1000,
        MAX: 1000000,
        getRule: function (type) {
          if (type === 'min') {
            return 'Цена не должна быть меньше ' + this.MIN + '.';
          } else {
            return 'Цена не должна быть больше ' + this.MAX + '.';
          }
        }
      },
      HOUSE: {
        MIN: 5000,
        MAX: 1000000,
        getRule: function (type) {
          if (type === 'min') {
            return 'Цена не должна быть меньше ' + this.MIN + '.';
          } else {
            return 'Цена не должна быть больше ' + this.MAX + '.';
          }
        }
      },
      PALACE: {
        MIN: 10000,
        MAX: 1000000,
        getRule: function (type) {
          if (type === 'min') {
            return 'Цена не должна быть меньше ' + this.MIN + '.';
          } else {
            return 'Цена не должна быть больше ' + this.MAX + '.';
          }
        }
      }
    }
  };

  function Validation(input) {
    this.input = input;
    this.config = Config;
    this.isEmpty = true;

    this.onInputFocus = this.focus.bind(this);

    this.input.addEventListener('focus', this.onInputFocus);
    this.input.addEventListener('blur', this.onInputBlur);
  }

  Validation.prototype.focus = function () {
    this.onInputKeyup = this.check.bind(this);
    this.input.addEventListener('keyup', this.onInputKeyup);
    this.check();
  };

  Validation.prototype.blur = function () {
    this.input.removeEventListener('keyup', this.onInputKeyup);
  };

  Validation.prototype.check = function () {
    this.valid = true;
    this.rules = [];
    this.errors = [];
    var _name = this.input.name;
    switch (_name) {
      case 'title':
        this.checkLength('min');
        this.checkLength('max');
        break;
      case 'price':
        this.checkPrice('min');
        this.checkPrice('max');
        break;
    }
    this.input.parentNode.insertBefore(this.createList(), this.input.nextSibling);
    if (this.valid) {
      this.input.style = 'border: 1px solid green; color: green;';
    } else {
      this.input.style = 'border: 1px solid red; color: red;';
    }
    if (!this.errors.length) {
      this.input.setCustomValidity('');
    } else {
      this.input.setCustomValidity(this.errors.join('\r\n'));
    }
  };

  Validation.prototype.createRule = function (rule) {
    var item = document.createElement('li');
    item.className = 'rule';
    item.textContent = rule.text;
    if (rule.valid) {
      item.style = 'padding-bottom: 10px; margin: 0px; color: green';
    } else {
      this.valid = false;
      item.style = 'padding-bottom: 10px; margin: 0px; color: red';
    }
    return item;
  };

  Validation.prototype.createList = function () {
    var list;
    if (this.isEmpty) {
      list = document.createElement('ul');
      list.className = 'rules';
      list.style = 'padding: 0px; list-style: none; margin: 0px';
      this.isEmpty = false;
    } else {
      list = this.input.nextSibling;
      list.textContent = '';
    }
    this.fillList(list);
    return list;
  };

  Validation.prototype.fillList = function (list) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < this.rules.length; i++) {
      var rule = this.rules[i];
      var item = this.createRule(rule);
      if (!rule.valid) {
        this.errors.push(rule.text);
      }
      fragment.appendChild(item);
    }
    list.appendChild(fragment);
  };

  Validation.prototype.checkLength = function (type) {
    var _value = this.input.value;
    var _config = this.config.LENGTH;
    var rule = {};
    rule.text = _config.getRule(type);
    if (type === 'min') {
      if (_value.length < _config.MIN) {
        rule.valid = false;
      } else {
        rule.valid = true;
      }
    } else {
      if (_value.length > _config.MAX) {
        rule.valid = false;
      } else {
        rule.valid = true;
      }
    }
    this.rules.push(rule);
  };

  Validation.prototype.checkPrice = function (type) {
    var _value = this.input.value;
    var _config = this.config.PRICE;
    var _select = document.querySelector('#type');
    var _type = _select[_select.selectedIndex].value.toUpperCase();
    this.input.placeholder = _config[_type].MIN;
    var rule = {};
    rule.text = _config[_type].getRule(type);
    if (type === 'min') {
      if (_value < _config[_type].MIN) {
        rule.valid = false;
      } else {
        rule.valid = true;
      }
    } else {
      if (_value > _config[_type].MAX) {
        rule.valid = false;
      } else {
        rule.valid = true;
      }
    }
    this.rules.push(rule);
  };

  window.Validation = Validation;

})();
