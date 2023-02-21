// Функция для проверки длины строки.

const checkStringLength = function (str, stringLength) {
  str = str.toString();
  return str.length >= stringLength;
};

checkStringLength('строка', 6);

// Функция для проверки, является ли строка палиндромом.

const checkPalindrom = function (str) {
  str = str.toLowerCase().replaceAll(' ', '');
  return str === str.split('').reverse().join('');
};

checkPalindrom('Анна');

// /* Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
// и возвращает их в виде целого положительного числа. */

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

getNumberInString(2.45);

// /* Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами
// и возвращает исходную строку, дополненную указанными символами до заданной длины. */

const getAddedString = function (str, minLength, strAdd) {
  const n = minLength - str.length;

  if (n <= 0) {
    return str;
  }

  return (strAdd.slice(0, n % strAdd.length) + strAdd.repeat(n / strAdd.length) + str);
};

getAddedString('q', 4, 'we');
