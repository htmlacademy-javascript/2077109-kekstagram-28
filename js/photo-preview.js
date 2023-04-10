const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const miniPreviews = document.querySelectorAll('.effects__preview:last-of-type');

const loadUserPhoto = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    preview.src = URL.createObjectURL(file);

    miniPreviews.forEach((miniPreview) => {
      miniPreview.style.setProperty('background-image', `url(${URL.createObjectURL(file)})`);
    });
  });
};

export {loadUserPhoto};


