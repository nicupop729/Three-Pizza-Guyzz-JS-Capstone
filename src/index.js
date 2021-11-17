import './style.css';
import './assets/stylesheets/reservation.css';
import getPizza from './hitApi.js';
import getLikes from './hitApi.js';

getPizza();
getLikes();
import { getResipe, populateRes } from './reservation_feature/reserveation.js';

import { getResipe, populateRes } from './reservation_feature/reserveation.js';

const body = document.querySelector('body');
const wrapper = document.querySelector('.wrapper');

const display = async () => {
  await getPizza();
  const reservatonBtns = document.querySelectorAll('.reservation-btns');
  reservatonBtns.forEach((button) => {
    button.addEventListener('click', async (e) => {
      const pizza = await getResipe(e.target.id);
      body.appendChild(populateRes(pizza.recipe, pizza.image, pizza.title, wrapper));
    });
  });
};

display();
display();
