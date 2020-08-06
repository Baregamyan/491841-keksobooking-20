'use strict';

var MOCK_QUANTITY = 8;

document.querySelector('.map').classList.toggle('map--faded', false);

function generateMock(quantity) {
  var mocks = [];
  for (var i = 0; i < quantity; i++) {
    var mock = new window.Mock(i);
    mocks.push(mock);
  }
  return mocks;
}

function generatePin() {
  var _container = document.querySelector('.map__pins');
  var _fragment = document.createDocumentFragment();
  generateMock(MOCK_QUANTITY).forEach(function (data) {
    var pin = new window.Pin(data);
    _fragment.appendChild(pin);
  });
  _container.appendChild(_fragment);
}

generatePin();

