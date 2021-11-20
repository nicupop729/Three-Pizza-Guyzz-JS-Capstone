const itemCounter = async (value) => {
  const counter = document.querySelector('.item-counter');
  const underText = document.querySelector('.inner-text');
  setTimeout(() => {
    counter.innerHTML = `Total Pizza: ${value.length}`;
    underText.innerHTML = `Reserve a pizza, come any time inside the reservation and have it in
    20 min after you arrive!`;
  }, 4000);

  return value.length;
};

export default itemCounter;
