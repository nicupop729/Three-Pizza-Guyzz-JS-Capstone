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
  const wrapper = document.createElement('div');
  wrapper.classList.add('res-wrapper');
  const resContainer = document.createElement('div');
  resContainer.classList.add('res-container');
  const header = document.createElement('header');
  header.classList.add('reservation-header');
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'X';
  closeBtn.id = 'reservation-close-btn';
  closeBtn.addEventListener('click', () => {
    resContainer.style.display = 'none';
  });

  header.appendChild(closeBtn);
  const imageCont = document.createElement('div');
  imageCont.classList.add('res-image-conatainer');
  const img = document.createElement('img');
  img.src = image;
  img.alt = 'pizza';
  img.classList.add('pizza-image')
  imageCont.appendChild(img);

  const details = document.createElement('div');
  details.classList.add('res-details');
  const itmeTitle = document.createElement('h2');
  itmeTitle.textContent = title;
  const recipeCont = document.createElement('ul');

  recipe.forEach((obj) => {
    const list = document.createElement('li');
    list.innerHTML = `${obj.quantity === null ? ' ' : obj.quantity} ${obj.unit} ${obj.unit === 'tsp' || obj.unit === 'cup' ? 'of' : " "} ${obj.description};`;
    recipeCont.appendChild(list);
  });

  details.appendChild(itmeTitle);
  details.appendChild(recipeCont);

  const reservations = document.createElement('div');
  reservations.classList.add('reservations');
  const reserveRecord = document.createElement('div');
  reserveRecord.style.display = 'flex';
  const resTitle = document.createElement('h2');
  resTitle.textContent = 'Current Reservations';
  const date = document.createElement('p');
  date.classList.add('res-dates');
  date.textContent = '21/11/2021 - 10/12/2021';
  const userName = document.createElement('p');
  userName.classList.add('userName');
  userName.textContent = 'Hope';


  reserveRecord.appendChild(date);
  reserveRecord.appendChild(userName);
  reservations.appendChild(resTitle);
  reservations.appendChild(reserveRecord);

  const addReserve = document.createElement('form');
  addReserve.id = 'add-reserve-form';
  const formTitle = document.createElement('h2');
  formTitle.textContent = 'Add a reservation';
  const inputName = document.createElement('input');
  inputName.type = 'text';
  inputName.placeholder = 'Enter Your Name';
  inputName.id = 'res-input-name';
  const inputStartDate = document.createElement('input');
  inputStartDate.type = 'date';
  inputStartDate.id = 'res-input-start';
  const inputEndDate = document.createElement('input');
  inputEndDate.type = 'date';
  inputEndDate.id = 'res-input-end';
  const submit = document.createElement('button');
  submit.textContent = 'Reserve a pizza';
  submit.type = 'submit';
  submit.id = 'submit-btn';

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
  wrapper.appendChild(resContainer);

  return wrapper;
};

export { getResipe, populateRes };