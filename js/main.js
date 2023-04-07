import { createMiniatures, picturesContainer } from './miniatures.js';
import { renderBigPhoto } from './full-size-photo.js';
import {openEditImgModal, uploadInput} from './modal-upload-img.js';
import { getData } from './api.js';

uploadInput.addEventListener('change', () => {
  openEditImgModal();
});

getData(createMiniatures, renderBigPhoto, picturesContainer);
