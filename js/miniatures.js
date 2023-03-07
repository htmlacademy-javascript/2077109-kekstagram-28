import { createArrayDescriptionsPhoto } from './data.js';

const template = document.querySelector('#picture').content;
const picturesRendering = createArrayDescriptionsPhoto();
const pictureRenderingFragment = document.createDocumentFragment();
const picturesContainer = document.querySelector('.pictures');

const getRenderingMiniatures = () => {
  picturesRendering.forEach(({url, likes, comments}) => {
    const userPictureElement = template.cloneNode(true);
    userPictureElement.querySelector('.picture__likes').textContent = likes;
    userPictureElement.querySelector('.picture__comments').textContent = comments.length;
    userPictureElement.querySelector('.picture__img').src = url;
    pictureRenderingFragment.appendChild(userPictureElement);
  });

  picturesContainer.appendChild(pictureRenderingFragment);
};

export {getRenderingMiniatures};
