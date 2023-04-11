import { scaleReset, onBiggerButtonClick, onSmallerButtonClick, scaleControlBigger, scaleControlSmaller } from './scale.js';
import { sliderElement, sliderContainer, effectsButtonsList, onEffectsListClick, effectsReset } from './effects.js';
import { isEscapeKey } from './utility.js';

const body = document.querySelector('body');
const uploadInput = document.querySelector('.img-upload__input');
const editImgForm = document.querySelector('.img-upload__overlay');
const editImgFormCancel = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentsField = document.querySelector('.text__description');
const input = document.querySelector('.effects__radio ');

const uploadInputReset = () => {
  uploadInput.value = '';
  hashtagField.value = '';
  commentsField.value = '';
  input.checked = true;
};

const cleanPristineErrorText = (pristineError) => {
  pristineError.forEach((elem) => {
    elem.textContent = '';
  });
};

const removeHandlerWhenFocusHashtagField = () => {
  document.removeEventListener('keydown', onDocumentKeydownForm);
};

const addHandlerWhenFocusOutHashtagField = () => {
  document.addEventListener('keydown', onDocumentKeydownForm);
};

const removeHandlerWhenFocusCommentField = () => {
  document.removeEventListener('keydown', onDocumentKeydownForm);
};

const addHandlerWhenFocusOutCommentField = () => {
  document.addEventListener('keydown', onDocumentKeydownForm);
};

const closeEditImgModal = () => {
  const pristineError = document.querySelectorAll('.pristine-error');
  cleanPristineErrorText(pristineError);
  editImgForm.classList.add('hidden');
  body.classList.remove('modal-open');
  effectsReset();
  uploadInputReset();

  editImgFormCancel.removeEventListener('click', closeEditImgModal);
  effectsButtonsList.removeEventListener('click', onEffectsListClick);
  scaleControlSmaller.removeEventListener('click', onSmallerButtonClick);
  scaleControlBigger.removeEventListener('click', onBiggerButtonClick);
  hashtagField.removeEventListener('focus', removeHandlerWhenFocusHashtagField);
  hashtagField.removeEventListener('focusout', addHandlerWhenFocusOutHashtagField);
  commentsField.removeEventListener('focus', removeHandlerWhenFocusCommentField);
  commentsField.removeEventListener('focusout', addHandlerWhenFocusOutCommentField);
  document.removeEventListener('keydown', onDocumentKeydownForm);
};

const openEditImgModal = () => {
  editImgForm.classList.remove('hidden');
  body.classList.add('modal-open');
  scaleReset();
  sliderElement.classList.add('hidden');
  sliderContainer.classList.add('hidden');

  editImgFormCancel.addEventListener('click', closeEditImgModal);
  effectsButtonsList.addEventListener('click', onEffectsListClick);
  scaleControlSmaller.addEventListener('click', onSmallerButtonClick);
  scaleControlBigger.addEventListener('click', onBiggerButtonClick);
  hashtagField.addEventListener('focus', removeHandlerWhenFocusHashtagField);
  hashtagField.addEventListener('focusout', addHandlerWhenFocusOutHashtagField);
  commentsField.addEventListener('focus', removeHandlerWhenFocusCommentField);
  commentsField.addEventListener('focusout', addHandlerWhenFocusOutCommentField);
  document.addEventListener('keydown', onDocumentKeydownForm);
};

function onDocumentKeydownForm(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditImgModal();
  }
}

const onUploadInputChange = () => {
  uploadInput.addEventListener('change', () => {
    openEditImgModal();
  });
};

export {closeEditImgModal, onDocumentKeydownForm, onUploadInputChange};
