import { idPhoto, getRandomInteger, getRandomArrayElement } from './utility.js';

const DESCRIPTIONS = [
  'На отдыхе',
  'На работе',
  'На тренировке',
  'На улице',
  'В школе',
];

const NAMES = [
  'Александр',
  'Никита',
  'Иван',
  'Анастасия',
  'Надежда',
  'Дмитрий',
  'Виктория',
  'Юлия',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const createRandomIdFromRangeGenerator = (a, b) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(a, b);

    if (previousValues.length >= b - a + 1) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(a, b);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generateCommentsId = createRandomIdFromRangeGenerator(1, 999);

const createComments = () => ({
  id: generateCommentsId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createDescriptionsPhoto = () => ({
  id: idPhoto() - 1,
  url: `photos/${generatePhotoId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(1, 16) }, createComments),
});

const createArrayDescriptionsPhoto = () => Array.from(
  { length: 25 },
  createDescriptionsPhoto
);

export {createArrayDescriptionsPhoto};
