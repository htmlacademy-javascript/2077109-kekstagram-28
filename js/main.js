import { createMiniatures, picturesContainer } from './miniatures.js';
import { renderBigPhoto } from './full-size-photo.js';
import { createArrayDescriptionsPhoto } from './data.js';
import {openEditImgModal, uploadInput} from './modal-upload-img.js';

const pictures = createArrayDescriptionsPhoto();

createMiniatures(pictures);
renderBigPhoto(pictures, picturesContainer);

uploadInput.addEventListener('change', () => {
  openEditImgModal();
});
