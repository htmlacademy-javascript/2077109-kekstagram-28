const DESCRIPTION = [
  'На отдыхе',
  'На работе',
  'На тренировке',
  'На улице',
  'В школе',
];

const NAME = [
  'Александр',
  'Никита',
  'Иван',
  'Анастасия',
  'Надежда',
  'Дмитрий',
  'Виктория',
  'Юлия',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const createDescriptionPhoto = function () {
  return {
    id: getRandomInteger(1, 25),
    url: `photos/${getRandomInteger(1, 25)}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomInteger(15, 200),
    comments: [
      { id: getRandomInteger(1, 999) },
      { avatar: `img/avatar-${getRandomInteger(1, 6)}.svg` },
      { message: getRandomArrayElement(MESSAGE) },
      { name: getRandomArrayElement(NAME) },
    ],
  };
};

const arrayDescriptionPhoto = Array.from({ length: 25 }, createDescriptionPhoto);

// Я знаю, это не функция, просто чтоб линтер не ругался:)
arrayDescriptionPhoto();

