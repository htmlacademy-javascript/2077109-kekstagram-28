import { unblockSubmitButton, addSuccessMessageListeners, addErrorMessageListeners, showErrorDataMessage} from './form.js';

const getData = (createMiniatures,renderBigPhoto, picturesContainer) => {
  fetch('https://28.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      createMiniatures(data);
      renderBigPhoto(data, picturesContainer);
    })
    .catch(() => {
      showErrorDataMessage();
    });
};

const sendData = (body, onSuccess, successMessage, errorMessage) => {
  fetch (
    'https://28.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        unblockSubmitButton();
        successMessage();
        addSuccessMessageListeners();

      } else {
        errorMessage();
        addErrorMessageListeners();
        unblockSubmitButton();

      }
    })
    .catch(() => {
      errorMessage();
      addErrorMessageListeners();
      unblockSubmitButton();

    });
};

export {getData, sendData};

