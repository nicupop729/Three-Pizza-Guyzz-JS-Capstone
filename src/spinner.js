const spinLoader = document.querySelector('.loading');

const loadSpinner = () => {
  setTimeout(() => {
    spinLoader.style.display = 'none';
  }, 4500);
};

export default loadSpinner;
