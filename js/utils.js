'use strict';

/**
 * Возвращает случайное число.
 * @param {number} min - Минимально-возможное число.
 * @param {number} max - Максимально-возможное число.
 * @return {number}
 */
function getRandomInit(min, max) {
  var _min = min || 0;
  var _max = max || 700;
  var _rand = _min + Math.random() * (_max - _min);
  return Math.round(_rand);
}

/**
 * Перемешивает элеметы в массиве и возвращает перемешанный массив.
 * @param {Array} array - Массив.
 * @return {Array}
 */
function shuffleArray(array) {
  var uniques = [];
  var i = 0;
  while (i < array.length) {
    var _element = array[window.utils.randomInit(0, array.length - 1)];
    if (!uniques.includes(_element)) {
      uniques.push(_element);
      i++;
    }
  }
  return uniques;
}

window.utils = {
  randomInit: getRandomInit,
  shuffle: shuffleArray
};


