const spinLoader = document.querySelector('.loading');

const loadSpinner = () => {
  setTimeout(() => {
    spinLoader.style.display = 'none';
  }, 1000);
};

export default loadSpinner;
