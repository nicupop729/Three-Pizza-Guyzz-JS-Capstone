// eslint-disable-next-line import/no-cycle
import { getResipe } from '../api-calls/forkifyAPI';

// eslint-disable-next-line import/no-cycle
import {
  getReservations,
  submitReservation,
} from '../api-calls/involvementAPI';

const n = new Date();
const y = n.getFullYear();
let m = n.getMonth() + 1;
let d = n.getDate();

if (m < 10) m = `0${m.toString()}`;
else if (d < 10) d = `0${d.toString()}`;

const minDate = `${y}-${m}-${d}`;
const updateDate = (startDate, endDate) => {
  const firstdate = startDate.value;
  endDate.min = firstdate;
};

const populateRes = (recipe, image, title) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('res-wrapper');
  const resContainer = document.createElement('div');
  resContainer.classList.add('res-container');
  const header = document.createElement('header');
  header.classList.add('reservation-header');
  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '<ion-icon name="close-outline"></ion-icon>';
  closeBtn.id = 'reservation-close-btn';
  closeBtn.addEventListener('click', () => {
    document.querySelector('body').removeChild(resContainer);
    document.querySelector('body').removeChild(wrapper);
  });

  header.appendChild(closeBtn);
  const imageCont = document.createElement('div');
  imageCont.classList.add('res-image-conatainer');
  const img = document.createElement('img');
  img.src = image;
  img.alt = 'pizza';
  img.classList.add('pizza-image');
  imageCont.appendChild(img);

  const details = document.createElement('div');
  details.classList.add('res-details');
  const itmeTitle = document.createElement('h2');
  itmeTitle.textContent = title;
  const recipeCont = document.createElement('ul');

  recipe.forEach((obj) => {
    const list = document.createElement('li');
    list.innerHTML = `${obj.quantity === null ? '' : obj.quantity} ${
      obj.unit
    } ${obj.unit === 'tsp' || obj.unit === 'cup' ? 'of' : ''} ${
      obj.description
    };`;
    recipeCont.appendChild(list);
  });

  details.appendChild(itmeTitle);
  details.appendChild(recipeCont);

  const reservations = document.createElement('div');
  reservations.classList.add('reservations');
  const reserveRecord = document.createElement('div');
  reserveRecord.style.display = 'none';
  reserveRecord.classList.add('resrvation-record');
  const reservationHeder = document.createElement('div');
  reservationHeder.classList.add('reserve-header');
  const resTitle = document.createElement('h2');
  reservationHeder.appendChild(resTitle);
  resTitle.classList.add('res-title');
  reservations.appendChild(reservationHeder);
  reservations.appendChild(reserveRecord);

  const addReserve = document.createElement('form');
  addReserve.classList.add('add-reserve-form');
  const formTitle = document.createElement('h2');
  formTitle.textContent = 'Add a reservation';
  const inputName = document.createElement('input');
  inputName.type = 'text';
  inputName.placeholder = 'Enter Your Name';
  inputName.required = true;
  inputName.classList.add('intput-name');
  const inputStartDate = document.createElement('input');
  inputStartDate.type = 'date';
  inputStartDate.classList.add('intput-start');
  inputStartDate.setAttribute('min', minDate);
  const inputEndDate = document.createElement('input');
  inputEndDate.type = 'date';
  inputEndDate.classList.add('intput-end');
  const submit = document.createElement('button');
  submit.textContent = 'Reserve a pizza';
  submit.type = 'submit';
  submit.classList.add('submit-btn');
  const confirmationMss = document.createElement('p');
  confirmationMss.classList.add('res-confirmation-msg');

  addReserve.appendChild(formTitle);
  addReserve.appendChild(inputName);
  addReserve.appendChild(inputStartDate);
  addReserve.appendChild(inputEndDate);
  addReserve.appendChild(submit);
  addReserve.appendChild(confirmationMss);

  resContainer.appendChild(header);
  resContainer.appendChild(imageCont);
  resContainer.appendChild(details);
  resContainer.appendChild(reservations);
  resContainer.appendChild(addReserve);
  document.querySelector('body').appendChild(wrapper);

  return resContainer;
};

const reservationCounter = async (pizzaId) => {
  const reservations = await getReservations(pizzaId);
  return reservations.length;
};

const displayResCounter = (resNum, container) => {
  if (!resNum) container.textContent = 'No reservations yet';
  if (resNum === 1) container.textContent = '1 Reservation';
  if (resNum > 1) {
    container.textContent = `Reservations (${resNum})`;
  }
};

const updateCounter = async (id, container) => {
  const reservaions = await getReservations(id);
  const reservLenght = reservaions.length;
  const displayNewRes = () => {
    if (reservLenght === 1) container.textContent = '1 Reservation';
    if (reservLenght > 1) {
      container.textContent = `Reservations (${reservLenght})`;
    }
  };
  displayNewRes();
};

const renderMsg = (container, status, msg) => {
  container.classList.toggle(status);
  container.innerHTML = msg;
  container.style.display = 'block';
  setTimeout(() => {
    container.classList.toggle(status);
    container.style.display = 'none';
  }, 5000);
};

export const renderSucces = (container, status, msg) => {
  renderMsg(container, status, msg);
};

export const renderError = (container, status, msg) => {
  renderMsg(container, status, msg);
};

const displayReservation = async (pizzaId, container) => {
  const reservationArr = await getReservations(pizzaId);
  if (reservationArr) {
    container.innerHTML = '';
    container.style.display = 'flex';
    reservationArr.forEach((element) => {
      const htmlText = `<div class="res-records"> Reserved from <b>${element.date_start}</b> until <b>${element.date_end}</b> by ${element.username}</div>`;
      container.insertAdjacentHTML('afterbegin', htmlText);
    });
  }
};

const creatPopUp = async (e) => {
  const currentId = e.target.id;
  const data = await getResipe(currentId);
  const resrLeng = await reservationCounter(currentId);

  document
    .querySelector('body')
    .appendChild(populateRes(data.recipe, data.image, data.title));
  const form = document.querySelector('.add-reserve-form');
  const intName = document.querySelector('.intput-name');
  const intStartDate = document.querySelector('.intput-start');
  const intEndDate = document.querySelector('.intput-end');
  const recorsCont = document.querySelector('.resrvation-record');
  const notification = document.querySelector('.res-confirmation-msg');
  const resTitle = document.querySelector('.res-title');

  displayReservation(currentId, recorsCont);

  displayResCounter(resrLeng, resTitle);

  intStartDate.addEventListener('change', () => {
    updateDate(intStartDate, intEndDate);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitReservation(
      currentId,
      intName.value,
      intStartDate.value,
      intEndDate.value,
      notification,
    );

    form.reset();

    setTimeout(() => {
      displayReservation(currentId, recorsCont);
      updateCounter(currentId, resTitle);
    }, 1000);
  });
};

const displayResPopUp = (buttons) => {
  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      creatPopUp(e);
    });
  });
};

export default displayResPopUp;
