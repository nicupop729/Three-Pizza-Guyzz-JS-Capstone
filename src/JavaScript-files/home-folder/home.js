/* eslint-disable import/no-cycle */
import { clickLikes, getLikes } from '../api-calls/involvementAPI';
// eslint-disable-next-line import/no-cycle
import displayPopUp from '../comms-folder/display-comments.js';
import displayResPopUp from '../reservations-folder/reserveation.js';
import showLiked from './displayLike.js';

const displayPizza = document.querySelector('.display-pizza');

const showPizza = async (value) => {
  const likedData = [];
  await getLikes().then((theLike) => theLike.forEach((datLike) => {
    likedData.push(datLike);
  }));
  value.forEach((dat) => {
    const divContainer = document.createElement('div');
    divContainer.className = 'pizza-container';
    const image = document.createElement('img');
    image.alt = 'pizza-image';
    image.src = dat.image_url;

    const likes = document.createElement('span');
    likes.innerHTML = '\u2661';
    likes.className = 'like-me';

    const namePub = document.createElement('span');
    namePub.innerHTML = dat.title;
    namePub.classList.add('pizza-name');

    const namePizz = document.createElement('span');
    namePizz.textContent = 'No Likes';

    const commentBtn = document.createElement('button');
    commentBtn.innerHTML = 'Comment';
    commentBtn.classList.add('comment-btn');
    commentBtn.id = dat.id;

    const reservationBtn = document.createElement('button');
    reservationBtn.id = dat.id;
    reservationBtn.classList.add('reservation-btns');
    reservationBtn.innerHTML = 'Reservation';

    divContainer.appendChild(image);
    divContainer.appendChild(likes);
    divContainer.appendChild(namePub);

    showLiked(likedData, dat, namePizz);

    likes.addEventListener('click', (e) => {
      e.preventDefault();
      clickLikes(dat);
      setTimeout(() => {
        showLiked(likedData, dat, namePizz);
      }, 1000);
    });

    divContainer.insertBefore(namePizz, namePub);

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
