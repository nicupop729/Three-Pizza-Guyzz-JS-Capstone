// eslint-disable-next-line import/no-cycle
import displayPopUp from './display-comments.js';
import displayResPopUp from './reservation_feature/reserveation.js';

const displayPizza = document.querySelector('.display-pizza');

const showPizza = (value) => {
  value.forEach((dat) => {
    const divContainer = document.createElement('div');
    divContainer.className = 'pizza-container';
    const image = document.createElement('img');
    image.alt = 'pizza-image';
    image.src = dat.image_url;

    const namePub = document.createElement('span');
    namePub.innerHTML = dat.publisher;

    const namePizz = document.createElement('span');
    namePizz.innerHTML = dat.title;

    const commentBtn = document.createElement('button');
    commentBtn.innerHTML = 'Comment';
    commentBtn.classList.add('comment-btn');
    commentBtn.id = dat.id;

    const reservationBtn = document.createElement('button');
    reservationBtn.id = dat.id;
    reservationBtn.classList.add('reservation-btns');
    reservationBtn.innerHTML = 'Reservation';

    divContainer.appendChild(image);
    divContainer.appendChild(namePub);
    divContainer.appendChild(namePizz);
    divContainer.appendChild(commentBtn);
    divContainer.appendChild(reservationBtn);
    displayPizza.appendChild(divContainer);
  });

  const commentBtns = [...document.querySelectorAll('.comment-btn')];
  const reservationBtns = [...document.querySelectorAll('.reservation-btns')];

  displayPopUp(commentBtns);
  displayResPopUp(reservationBtns);
};

export default showPizza;
