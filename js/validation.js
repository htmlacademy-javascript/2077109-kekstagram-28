const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const TAG_ERROR_TEXT = 'Неправильно заполнены хэштеги';
const MAX_LENGTH_COMMENT = 140;
const COMMENT_ERROR_TEXT = 'Длинна комментария не может быть больше 140 символов';

const form = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const commentsField = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__form__error-text',
});

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const getHastagValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const getHasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const getValidateTags = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return getHastagValidCount(tags) && getHasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  getValidateTags,
  TAG_ERROR_TEXT
);

const isValidComment = (comments) => comments.length <= MAX_LENGTH_COMMENT;

pristine.addValidator(
  commentsField,
  isValidComment,
  COMMENT_ERROR_TEXT
);


const isValidSend = (evt) => {
  if (pristine.validate() === false) {
    evt.preventDefault();
  }
};

export {form, pristine, isValidSend};
