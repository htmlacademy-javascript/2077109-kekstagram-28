const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const valueElement = document.querySelector('.effect-level__value');
const effectsButtonsList = document.querySelector('.effects__list');
const imageElement = document.querySelector('.img-upload__preview img');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 10,
  step: 1,
  connect: 'lower',
});

const sliderReset = () => {
  sliderElement.classList.remove('hidden');
  sliderContainer.classList.remove('hidden');
};

const onEffectsListClick = (evt) => {
  const target = evt.target.closest('.effects__item').querySelector('.effects__radio ');
  evt.preventDefault();

  if (target.id === 'effect-none') {
    target.checked = true;
    imageElement.className = 'effects__preview--effect-none';
    imageElement.style.removeProperty('filter');
    sliderElement.classList.add('hidden');
    sliderContainer.classList.add('hidden');

  } else if (target.id === 'effect-chrome') {
    target.checked = true;
    imageElement.className = 'effects__preview--chrome';
    sliderReset();
    sliderElement.noUiSlider.updateOptions ({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });

    sliderElement.noUiSlider.on('update', () => {
      valueElement.value = sliderElement.noUiSlider.get();
      imageElement.style.removeProperty('filter');
      imageElement.style.setProperty('filter', `grayscale(${valueElement.value})`);
    });

  } else if (target.id === 'effect-sepia') {
    target.checked = true;
    imageElement.className = 'effects__preview--sepia';
    sliderReset();
    sliderElement.noUiSlider.updateOptions ({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });

    sliderElement.noUiSlider.on('update', () => {
      valueElement.value = sliderElement.noUiSlider.get();
      imageElement.style.removeProperty('filter');
      imageElement.style.setProperty('filter', `sepia(${valueElement.value})`);
    });

  } else if (target.id === 'effect-marvin') {
    target.checked = true;
    imageElement.className = 'effects__preview--marvin';
    sliderReset();
    sliderElement.noUiSlider.updateOptions ({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });

    sliderElement.noUiSlider.on('update', () => {
      valueElement.value = sliderElement.noUiSlider.get();
      imageElement.style.removeProperty('filter');
      imageElement.style.setProperty('filter', `invert(${valueElement.value}%)`);
    });

  } else if (target.id === 'effect-phobos') {
    target.checked = true;
    imageElement.className = 'effects__preview--phobos';
    sliderReset();
    sliderElement.noUiSlider.updateOptions ({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });

    sliderElement.noUiSlider.on('update', () => {
      valueElement.value = sliderElement.noUiSlider.get();
      imageElement.style.removeProperty('filter');
      imageElement.style.setProperty('filter', `blur(${valueElement.value}px)`);
    });

  } else if (target.id === 'effect-heat') {
    target.checked = true;
    imageElement.className = 'effects__preview--heat';
    sliderReset();
    sliderElement.noUiSlider.updateOptions ({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    sliderElement.noUiSlider.on('update', () => {
      valueElement.value = sliderElement.noUiSlider.get();
      imageElement.style.removeProperty('filter');
      imageElement.style.setProperty('filter', `brightness(${valueElement.value})`);
    });
  }
};

const effectsReset = () => {
  imageElement.className = 'effects__preview--effect-none';
  imageElement.style.removeProperty('filter');
};

export {sliderElement, sliderContainer, effectsButtonsList, onEffectsListClick, effectsReset};
