const resApi = 'https://forkify-api.herokuapp.com/api/v2/recipes/';
const resKey = '?key=c9510895-3e98-4f84-a4ff-c56d29bdf5e0';

const getResipe = async (id) => {
  const response = await fetch(`${resApi}${id}${resKey}`);
  const cloud = await response.json();
  const recipe = cloud.data.recipe.ingredients;
  const image = cloud.data.recipe.image_url;
  const title = cloud.data.recipe.title;

  return {recipe, image, title};
};

const populateRes = (recipe, image, title) => {
  const resContainer = document.createElement('dev');
  resContainer.classList.add('res-container');
  const header = document.createElement('header');
  header.classList.add('reservation-header');
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'X';
  closeBtn.id = 'reservation-close-btn';
  closeBtn.addEventListener('click', () => {
    resContainer.style.display = 'none';
  })

  header.appendChild(closeBtn);
  const imageCont = document.createElement('dev');
  imageCont.classList.add('res-image-conatainer');
  const img = document.createElement('img');
  img.src = image;
  img.alt = 'pizza';
  imageCont.appendChild(img);


  const details = document.createElement('dev');
  details.classList.add('res-details');
  const itmeTitle = document.createElement('h2');
  itmeTitle.textContent = title;
  const recipeCont = document.createElement('ul');

  recipe.forEach(obj => {
    const list = document.createElement('li');
    list.innerHTML = `${obj.quantity} ${obj.unit} ${obj.description};`;
    recipeCont.appendChild(list);
  });

  details.appendChild(itmeTitle);
  details.appendChild(recipeCont);

  const reservations = document.createElement('dev');
  reservations.classList.add('reservations');
  const reserveRecord = document.createElement('div');
  reserveRecord.classList.add('reservation-records');
  const date = document.createElement('p');
  date.classList.add('res-dates');
  date.textContent = '21/11/2021 - 10/12/2021';
  const userName = document.createElement('p');
  userName.classList.add('userName');
  userName.textContent = 'Hope';

  reserveRecord.appendChild(date);
  reserveRecord.appendChild(userName);
  reservations.appendChild(reserveRecord);
  details.appendChild(reservations);

  const addReserve = document.createElement('form');
  addReserve.id = 'add-reserve-form';
  const formTitle = document.createElement('h2');
  formTitle.textContent = 'Add a reservation'
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
  addReserve.appendChild(inputEndDate)
  addReserve.appendChild(submit);

  resContainer.appendChild(header);
  resContainer.appendChild(imageCont);
  resContainer.appendChild(details);
  resContainer.appendChild(addReserve);

  return resContainer;
}

export {getResipe, populateRes}