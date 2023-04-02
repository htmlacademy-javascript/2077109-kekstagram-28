import { isEscapeKey } from './utility.js';
import { scaleReset, onBiggerButttonClick, onSmallerButttonClick, scaleControlBigger, scaleControlSmaller } from './change-scale.js';
import { sliderElement, sliderContainer, onEffectsButtonsListClick, effectsButtonsList, onEffectsListClick, effectsReset } from './add-effects.js';
import { form, isValidSend } from './validation.js';

const body = document.querySelector('body');
const uploadInput = document.querySelector('.img-upload__input');
const editImgForm = document.querySelector('.img-upload__overlay');
const editImgFormCancel = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentsField = document.querySelector('.text__description');

const uploadInputReset = () => {
  uploadInput.value = '';
};

const removeHandlerWhenFocusHashtagField = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
};
const addHandlerWhenFocusOutHashtagField = () => {
  document.addEventListener('keydown', onDocumentKeydown);
};

const removeHandlerWhenFocusCommentField = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
};

const addHandlerWhenFocusOutCommentField = () => {
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeEditImgModal = () => {
  editImgForm.classList.add('hidden');
  body.classList.remove('modal-open');
  effectsReset();
  uploadInputReset();

  editImgFormCancel.removeEventListener('click', closeEditImgModal);
  effectsButtonsList.removeEventListener('click', onEffectsButtonsListClick);
  effectsButtonsList.removeEventListener('click', onEffectsListClick);
  scaleControlSmaller.removeEventListener('click', onSmallerButttonClick);
  scaleControlBigger.removeEventListener('click', onBiggerButttonClick);
  hashtagField.removeEventListener('focus', removeHandlerWhenFocusHashtagField);
  hashtagField.removeEventListener('focusout', addHandlerWhenFocusOutHashtagField);
  commentsField.removeEventListener('focus', removeHandlerWhenFocusCommentField);
  commentsField.removeEventListener('focusout', addHandlerWhenFocusOutCommentField);
  document.removeEventListener('keydown', onDocumentKeydown);
  form.removeEventListener('submit', isValidSend);
};

const openEditImgModal = () => {
  editImgForm.classList.remove('hidden');
  body.classList.add('modal-open');
  scaleReset();
  sliderElement.classList.add('hidden');
  sliderContainer.classList.add('hidden');

  editImgFormCancel.addEventListener('click', closeEditImgModal);
  effectsButtonsList.addEventListener('click', onEffectsButtonsListClick);
  effectsButtonsList.addEventListener('click', onEffectsListClick);
  scaleControlSmaller.addEventListener('click', onSmallerButttonClick);
  scaleControlBigger.addEventListener('click', onBiggerButttonClick);
  hashtagField.addEventListener('focus', removeHandlerWhenFocusHashtagField);
  hashtagField.addEventListener('focusout', addHandlerWhenFocusOutHashtagField);
  commentsField.addEventListener('focus', removeHandlerWhenFocusCommentField);
  commentsField.addEventListener('focusout', addHandlerWhenFocusOutCommentField);
  document.addEventListener('keydown', onDocumentKeydown);
  form.addEventListener('submit', isValidSend);
};

uploadInput.addEventListener('change', () => {
  openEditImgModal();
});

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditImgModal();
  }
}
