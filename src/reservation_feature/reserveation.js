const resApi = 'https://forkify-api.herokuapp.com/api/v2/recipes/';
const resKey = '?key=c9510895-3e98-4f84-a4ff-c56d29bdf5e0';

const getResipe = async (id) => {
  const response = await fetch(`${resApi}${id}${resKey}`);
  const cloud = await response.json();
  const recipe = cloud.data.recipe.ingredients;
  const image = cloud.data.recipe.image_url;
  // eslint-disable-next-line prefer-destructuring
  const title = cloud.data.recipe.title;

  return { recipe, image, title };
};

const populateRes = (recipe, image, title) => {
  const resContainer = document.createElement('div');
  resContainer.classList.add('res-container');
  const header = document.createElement('header');
  header.classList.add('reservation-header');
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '<ion-icon name="close-outline"></ion-icon>';
  closeBtn.id = 'reservation-close-btn';
  closeBtn.addEventListener('click', () => {
    document.querySelector('body').removeChild(resContainer);
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
    list.innerHTML = `${obj.quantity === null ? ' ' : obj.quantity} ${
      obj.unit
    } ${obj.unit === 'tsp' || obj.unit === 'cup' ? 'of' : ' '} ${
      obj.description
    };`;
    recipeCont.appendChild(list);
  });

  details.appendChild(itmeTitle);
  details.appendChild(recipeCont);

  const reservations = document.createElement('div');
  reservations.classList.add('reservations');
  const reserveRecord = document.createElement('div');
  reserveRecord.style.display = 'flex';
  reserveRecord.classList.add('resrvation-record');
  const resTitle = document.createElement('h2');
  resTitle.textContent = 'Current Reservations';
  reservations.appendChild(resTitle);
  reservations.appendChild(reserveRecord);

  const addReserve = document.createElement('form');
  addReserve.classList.add('add-reserve-form');
  const formTitle = document.createElement('h2');
  formTitle.textContent = 'Add a reservation';
  const inputName = document.createElement('input');
  inputName.type = 'text';
  inputName.placeholder = 'Enter Your Name';
  inputName.classList.add('intput-name');
  const inputStartDate = document.createElement('input');
  inputStartDate.type = 'date';
  inputStartDate.classList.add('intput-start');
  const inputEndDate = document.createElement('input');
  inputEndDate.type = 'date';
  inputEndDate.classList.add('intput-end');
  const submit = document.createElement('button');
  submit.textContent = 'Reserve a pizza';
  submit.type = 'submit';
  submit.classList.add('submit-btn');

  addReserve.appendChild(formTitle);
  addReserve.appendChild(inputName);
  addReserve.appendChild(inputStartDate);
  addReserve.appendChild(inputEndDate);
  addReserve.appendChild(submit);

  resContainer.appendChild(header);
  resContainer.appendChild(imageCont);
  resContainer.appendChild(details);
  resContainer.appendChild(reservations);
  resContainer.appendChild(addReserve);

  return resContainer;
};

const getReservations = async (pizzaId) => {
  const dataComm = await fetch(
    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/8FcrK9POw5EbfAJUs4DD/reservations?item_id=${pizzaId}`,
  );
  const reservations = await dataComm.json();
  return reservations;
};

const submitReservation = async (pizzaId, name, dateStart, dateEnd) => {
  fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/8FcrK9POw5EbfAJUs4DD/reservations/',
    {
      method: 'POST',
      body: JSON.stringify({
        item_id: pizzaId,
        username: name,
        date_start: dateStart,
        date_end: dateEnd,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    },
  );
};

const displayReservation = async (pizzaId, container) => {
  const reservationArr = await getReservations(pizzaId);
  reservationArr.forEach((element) => {
    const htmlText = `<div class="res-records"> Reserved from <b>${element.date_start}</b> until <b>${element.date_end}</b> by ${element.username}</div>`;
    container.insertAdjacentHTML('afterbegin', htmlText);
  });
};

const creatPopUp = async (e) => {
  const currentId = e.target.id;
  const data = await getResipe(currentId);

  document
    .querySelector('body')
    .appendChild(populateRes(data.recipe, data.image, data.title));
  const form = document.querySelector('.add-reserve-form');
  const intName = document.querySelector('.intput-name');
  const intStartDate = document.querySelector('.intput-start');
  const intEndDate = document.querySelector('.intput-end');
  const recorsCont = document.querySelector('.resrvation-record');
  displayReservation(currentId, recorsCont);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitReservation(
      currentId,
      intName.value,
      intStartDate.value,
      intEndDate.value,
    );
    form.reset();
    setTimeout(() => {
      recorsCont.innerHTML = '';
      displayReservation(currentId, recorsCont);
    }, 2000);
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
