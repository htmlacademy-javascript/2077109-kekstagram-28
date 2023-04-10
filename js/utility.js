const clearComments = (container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {clearComments, isEscapeKey, debounce};
