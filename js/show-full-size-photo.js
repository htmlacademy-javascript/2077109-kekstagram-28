import { clearComments } from './util.js';
import { isEscapeKey } from './util.js';

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureModalImg = bigPictureModal.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPictureModal.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const commentsContainer = document.querySelector('.social__comments');
const socialCaption = document.querySelector('.social__caption');
const socialCommentCount = bigPictureModal.querySelector('.social__comment-count');
const commentLoader = bigPictureModal.querySelector('.comments-loader');
const body = document.querySelector('body');
const bigPictureModalCancel = document.querySelector('.big-picture__cancel');

const templateComment = document.querySelector('#comments').content;
const comentFragment = document.createDocumentFragment();

clearComments(commentsContainer);

const closeBigPictureModal = () => {
  bigPictureModal.classList.add('hidden');
  body.classList.remove('modal-open');
  clearComments(commentsContainer);

  document.removeEventListener('keydown', onDocumentKeydown);

  bigPictureModalCancel.removeEventListener('click', closeBigPictureModal);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureModal();
  }
}

const openUBigPictureModal = () => {
  bigPictureModal.classList.remove('hidden');
  commentLoader.classList.add('hidden');
  socialCommentCount.classList.add('hidden');
  body.classList.add('modal-open');

  bigPictureModalCancel.addEventListener('click', closeBigPictureModal);

  document.addEventListener('keydown', onDocumentKeydown);
};

const renderComents = (arrayPicturesElement) => {
  arrayPicturesElement.comments.forEach(({avatar, name, message}) => {
    const userComment = templateComment.cloneNode(true);
    userComment.querySelector('.social__picture').src = avatar;
    userComment.querySelector('.social__picture').alt = name;
    userComment.querySelector('.social__text').textContent = message;
    comentFragment.appendChild(userComment);
  });
  return commentsContainer.appendChild(comentFragment);
};

const renderBigPhoto = (arrayPictures, container) => {
  container.addEventListener('click', (evt) => {
    const target = evt.target.closest('.picture');
    if (target) {
      const currentDescription = arrayPictures.find((item) => item.id === Number(target.dataset.pictureId));
      bigPictureModalImg.src = currentDescription.url;
      commentsCount.textContent = currentDescription.comments.length;
      likesCount.textContent = currentDescription.likes;
      socialCaption.textContent = currentDescription.description;
      openUBigPictureModal();
      renderComents(currentDescription);
    }
  });
};

export {renderBigPhoto};
