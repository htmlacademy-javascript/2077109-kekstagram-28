// Функция для проверки длины строки.

const checkStringLength = function (str, stringLength) {
  str = str.toString();
  if (str.length >= stringLength) {
    return true;
  }
  return false;
};

checkStringLength();

// Функция для проверки, является ли строка палиндромом.

const checkPalindrom = function (str) {
  str = str.toLowerCase().replaceAll(' ', '');
  if (str === str.split('').reverse().join('')) {
    return true;
  }
  return false;
};

checkPalindrom();
// console.log(checkPalindrom('Анна'));

/* Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
и возвращает их в виде целого положительного числа. */

const getNumberInString = function (str) {
  if (Number.isInteger(str) || Number.parseFloat(str)) {
    str = str.toString().replace(/\D/g, '');
    str = parseFloat(str, 10);
    return str;
  }
  str = str.replace(/\D/g, '');
  str = parseFloat(str, 10);
  return str;
};

getNumberInString();

/* Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами
и возвращает исходную строку, дополненную указанными символами до заданной длины. */

const getAddedString = function (str, minLength, strAdd) {
  str = str.padStart(minLength, strAdd);
  return str;
};

getAddedString();
