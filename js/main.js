import { setUserFormSubmit, showSuccessMessage, showErrorMessage, addSuccessMessageListeners, addErrorMessageListeners, showAlert } from './form.js';
import { closeEditImgModal, onUploadInputChange } from './modal-upload-img.js';
import { renderBigPhoto } from './full-size-photo.js';
import { createMiniatures } from './miniatures.js';
import { loadUserPhoto } from './photo-preview.js';
import { getData, sendData } from './api.js';
import { initSort } from './photo-sorting.js';
import { debounce } from './utility.js';

setUserFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeEditImgModal();
    showSuccessMessage();
    addSuccessMessageListeners();
  } catch {
    showErrorMessage();
    addErrorMessageListeners();
  }
});

try {
  onUploadInputChange();
  const data = await getData();
  createMiniatures(data);
  renderBigPhoto(data);
  loadUserPhoto();
  initSort (data, debounce(createMiniatures, 500));
} catch (err) {
  showAlert(err.message);
}
