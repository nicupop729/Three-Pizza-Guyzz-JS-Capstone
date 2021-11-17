

const itemCounter = async (value) => {
    const counter = document.querySelector('.item-counter');
    counter.innerHTML = await `Total Pizza: (${value.length})`;
    return value.length;
  };
  
  export default itemCounter;