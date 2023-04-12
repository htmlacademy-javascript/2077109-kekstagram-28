import { isEscapeKey } from './utility.js';
import { onDocumentKeydownForm } from './modal-upload-img.js';

const ALERT_SHOW_TIME = 5000;
const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const TAG_ERROR_TEXT = 'Неправильно заполнены хэштеги';
const MAX_LENGTH_COMMENT = 140;
const COMMENT_ERROR_TEXT = 'Длинна комментария не может быть больше 140 символов';
const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const hashtagField = document.querySelector('.text__hashtags');
const commentsField = document.querySelector('.text__description');
const templateSuccess = document.querySelector('#success').content;
const successMessageFragment = document.createDocumentFragment();
const templateError = document.querySelector('#error').content;
const errorMessageFragment = document.createDocumentFragment();

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__form__error-text',
});

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const getHastagValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const getUniqueHastags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const getValidateTags = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return getHastagValidCount(tags) && getUniqueHastags(tags) && tags.every(isValidTag);
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

const showErrorMessage = () => {
  const errorMessageElement = templateError.cloneNode(true);
  errorMessageFragment.appendChild(errorMessageElement);
  document.removeEventListener('keydown', onDocumentKeydownForm);

  return body.appendChild(errorMessageFragment);
};

const closeErrorMessage = () => {
  const errorMessage = document.querySelector('.error');
  if (errorMessage !== null) {
    errorMessage.remove();
  }
  document.addEventListener('keydown', onDocumentKeydownForm);
  document.removeEventListener('keydown', onDocumentKeydownSuccessMessage);
  document.removeEventListener('click', closeErrorMessage);
  document.removeEventListener('keydown', onDocumentKeydownErrorMessage);
};

const addErrorMessageListeners = () => {
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onDocumentKeydownErrorMessage);
  document.addEventListener('click', closeErrorMessage);
};

const showSuccessMessage = () => {
  const successMessageElement = templateSuccess.cloneNode(true);
  successMessageFragment.appendChild(successMessageElement);

  return body.appendChild(successMessageFragment);
};

const closeSuccessMessage = () => {
  const successMessage = document.querySelector('.success');
  if(successMessage !== null) {
    successMessage.remove();
  }
  document.removeEventListener('click', closeSuccessMessage);
  document.removeEventListener('keydown', onDocumentKeydownSuccessMessage);
};

const addSuccessMessageListeners = () => {
  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onDocumentKeydownSuccessMessage);
  document.addEventListener('click', closeSuccessMessage);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function onDocumentKeydownSuccessMessage(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
}

function onDocumentKeydownErrorMessage(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю..';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      blockSubmitButton();
      await cb(new FormData(form));
      unblockSubmitButton();
    }
  });
};

export {setUserFormSubmit, showSuccessMessage, showErrorMessage, addSuccessMessageListeners, addErrorMessageListeners, showAlert};
