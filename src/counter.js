const itemCounter = async (value) => {
  const counter = document.querySelector('.item-counter');
  setTimeout(() => {
    counter.innerHTML = `Total Pizza: (${value.length})`;
  }, 4000);

  return value.length;
};

export default itemCounter;
