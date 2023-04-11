const template = document.querySelector('#picture').content;
const pictureRenderingFragment = document.createDocumentFragment();
const picturesContainer = document.querySelector('.pictures');
const filters = document.querySelector('.img-filters');

const createPictureElement = ({id, url, likes, comments, description}) => {
  const userPictureElement = template.cloneNode(true);
  userPictureElement.querySelector('.picture__likes').textContent = likes;
  userPictureElement.querySelector('.picture__comments').textContent = comments.length;
  userPictureElement.querySelector('.picture__img').src = url;
  userPictureElement.querySelector('.picture__img').alt = description;
  userPictureElement.querySelector('.picture').dataset.pictureId = id;

  return userPictureElement;
};

const createMiniatures = (array) => {
  array.forEach((miniature) => {
    pictureRenderingFragment.appendChild(createPictureElement(miniature));
  });

  picturesContainer.querySelectorAll('.picture').forEach((picture) => picture.remove());
  picturesContainer.appendChild(pictureRenderingFragment);
  filters.classList.remove('img-filters--inactive');
};

export {createMiniatures};
