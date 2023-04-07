import { closeEditImgModal } from './modal-upload-img.js';
import './modal-upload-img.js';
import { isEscapeKey } from './utility.js';
import { onDocumentKeydownForm } from './modal-upload-img.js';
import { sendData } from './api.js';

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
const templateErrorData = document.querySelector('#data-error').content;
const errorDataMessageFragment = document.createDocumentFragment();

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__form__error-text',
});

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const gethastagValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const gethasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const getvalidateTags = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return gethastagValidCount(tags) && gethasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  getvalidateTags,
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

const showErrorDataMessage = () => {
  const errorDataMessageElement = templateErrorData.cloneNode(true);
  errorDataMessageFragment.appendChild(errorDataMessageElement);

  return body.appendChild(errorDataMessageFragment);
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

const setUserFormSubmit = (onSuccess) => {

  form.addEventListener('submit', (evt) => {

    evt.preventDefault();

    if (pristine.validate() === true) {
      const formData = new FormData(evt.target);
      blockSubmitButton();

      sendData(formData, onSuccess, showSuccessMessage, showErrorMessage);
    }
  });
};

setUserFormSubmit(closeEditImgModal);

export {unblockSubmitButton, addSuccessMessageListeners, addErrorMessageListeners, showErrorDataMessage};
