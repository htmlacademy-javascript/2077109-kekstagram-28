import { clearComments, isEscapeKey } from './utility.js';

const COMMENT_IN_BLOCK = 5;
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
const picturesContainer = document.querySelector('.pictures');
let currentDescription;
let commentsShown = 0;

const renderComments = (arrayCommentsElement) => {
  const userComment = templateComment.cloneNode(true);
  userComment.querySelector('.social__picture').src = arrayCommentsElement.avatar;
  userComment.querySelector('.social__picture').alt = arrayCommentsElement.name;
  userComment.querySelector('.social__text').textContent = arrayCommentsElement.message;

  return userComment;
};

const createButtonCommentLoads = () => {
  commentsShown += COMMENT_IN_BLOCK;

  if (commentsShown >= currentDescription.comments.length) {
    commentLoader.classList.add('hidden');
    commentsShown = currentDescription.comments.length;
  } else {
    commentLoader.classList.remove('hidden');
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = renderComments(currentDescription.comments[i]);
    fragment.append(commentElement);
    renderComments(currentDescription.comments[i]);
  }
  commentsContainer.innerHTML = '';
  commentsContainer.append(fragment);
  socialCommentCount.innerHTML = `${commentsShown} из <span class="comments-count">${currentDescription.comments.length}</span> комментариев`;
};

const closeBigPictureModal = () => {
  bigPictureModal.classList.add('hidden');
  body.classList.remove('modal-open');
  clearComments(commentsContainer);
  commentsShown = 0;

  document.removeEventListener('keydown', onDocumentKeydown);
  commentLoader.removeEventListener('click', createButtonCommentLoads);
  bigPictureModalCancel.removeEventListener('click', closeBigPictureModal);
};

function onDocumentKeydown (event) {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closeBigPictureModal();
  }
}

const openBigPictureModal = () => {
  bigPictureModal.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  commentLoader.addEventListener('click', createButtonCommentLoads);
  bigPictureModalCancel.addEventListener('click', closeBigPictureModal);
};

const renderBigPhoto = (arrayPictures) => {
  picturesContainer.addEventListener('click', (evt) => {
    const target = evt.target.closest('.picture');
    if (target) {
      currentDescription = arrayPictures.find((item) => item.id === Number(target.dataset.pictureId));
      bigPictureModalImg.src = currentDescription.url;
      commentsCount.textContent = currentDescription.comments.length.toString;
      likesCount.textContent = currentDescription.likes;
      socialCaption.textContent = currentDescription.description;
      createButtonCommentLoads();
      openBigPictureModal();
    }
  });
};

export {renderBigPhoto};
