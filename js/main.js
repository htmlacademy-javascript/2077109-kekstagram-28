import { createMiniatures, picturesContainer } from './miniatures.js';
import { renderBigPhoto } from './full-size-photo.js';
import { getData, sendData } from './api.js';
import { setUserFormSubmit, showSuccessMessage, showErrorMessage, addSuccessMessageListeners, addErrorMessageListeners, showAlert } from './form.js';
import { closeEditImgModal, onUploadInputChange } from './modal-upload-img.js';

onUploadInputChange();

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
  const data = await getData();
  createMiniatures(data);
  renderBigPhoto(data, picturesContainer);
} catch (err) {
  showAlert(err.message);
}
