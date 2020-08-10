'use strict';

function Form() {
  this.form = document.querySelector('.ad-form');
  this.input = {
    avatar: this.form.querySelector('#avatar'),
    title: this.form.querySelector('#title'),
    address: this.form.querySelector('#address'),
    type: this.form.querySelector('#type'),
    price: this.form.querySelector('#price'),
    timein: this.form.querySelector('#timein'),
    timeout: this.form.querySelector('#timeout'),
    rooms: this.form.querySelector('#room_number'),
    guests: this.form.querySelector('#capacity')
  };
  this.disable();
}

Form.prototype.disable = function () {
  this.fieldsets = this.form.querySelectorAll('fieldset');
  this.form.classList.toggle('ad-form--disabled', true);
  for (var i = 0; i < this.fieldsets.length; i++) {
    var _fieldset = this.fieldsets[i];
    _fieldset.setAttribute('disabled', true);
  }
};

Form.prototype.enable = function () {
  this.form.classList.toggle('ad-form--disabled', false);
  for (var i = 0; i < this.fieldsets.length; i++) {
    var _fieldset = this.fieldsets[i];
    _fieldset.setAttribute('disabled', false);
  }
};

Form.prototype.setAddress = function (x, y) {
  this.input.address.value = Math.floor(x) + ', ' + Math.floor(y);
};

window.Form = Form;
