/* eslint-disable import/no-cycle */
import { getRecipe, sendNewComm, getComm } from './hitApi';

const domManip = (object) => {
  const htmlText = `
<div class="pop-up-comment-div">
<div class="inner-pop-up-comment-div">
<h3 class="recipe-title">${object.title}</h3>
<div class="grid">
<div class="pop-up-img-div">
<img
class="pop-up-img"
src="${object.image_url}"
/>
</div>
<p class="servings">Servings: ${object.servings}</p>
<p class="recipe">See full recipe <a class="link" href="${object.source_url}" target="_blank" rel="noopener">here</a></p>
<p class="inspiration">Inspired by: ${object.publisher}</p> 
<p class="ingredients">Ingredients</p>
<ul class="ingredients-list">
</ul>
</div>
<div class="comments-section">
<h3 class="comments-title"></h3>
<ul class="comments-list"> 
</ul>
<p class="leave-comm-text">Leave your comment</p>
<form class="leave-comm">
<input type="text" class="input-name" placeholder="Your name" required>
<textarea type="text" class="input-mess" placeholder="Your message" required></textarea>
<button class="pop-up-btn" type="submit">Send your message</button>
</form>
</div>
</div>
<span class="close-modul"><ion-icon name="close-outline"></ion-icon></span>
</div>
`;

  document.body.insertAdjacentHTML('afterbegin', htmlText);
};

const displayIngredients = (ingredients, container) => {
  ingredients.forEach((ingr) => {
    const textHTML = `
<li class="ingredient">${ingr.quantity === null ? '' : ingr.quantity} ${
      ingr.unit === 'tsp' ? 'teaspoons' : ingr.unit
    } ${ingr.unit === 'tsp' || ingr.unit === 'cup' ? 'of' : ''} ${
      ingr.description
    }</li>`;
    container.insertAdjacentHTML('beforeend', textHTML);
  });
};

const closePopUp = (x, popUp) => {
  x.addEventListener('click', () => {
    popUp.style.display = 'none';
  });
};

const commentCounter = (arr) => {
  const newArr = [...arr];
  const arrLenght = newArr.length;
  return arrLenght;
};

const commentCounterApi = async (value) => {
  const commNum = await getComm(value);
  if (commNum) {
    return commentCounter(commNum);
  }
  return null;
};

const getCommArray = async (pizzaId, container) => {
  const commArr = await getComm(pizzaId);
  if (commArr) {
    commArr.forEach((comm) => {
      const textHTML = `
<li class="comment">${comm.creation_date}
<span class="user-name">${comm.username}</span>: ${comm.comment}
</li>
`;
      container.insertAdjacentHTML('afterbegin', textHTML);
    });
  }
};

const commCounterDisplay = async (value, container) => {
  const newValue = await value;
  if (!newValue) container.textContent = 'No comments yet';
  if (newValue === 1) container.textContent = '1 Comment';
  if (newValue > 1) container.textContent = `Comments (${newValue})`;
};

const buildPopUp = async (e) => {
  const pizzaId = e.target.id;
  const apiResult = await getRecipe(pizzaId);

  domManip(apiResult);

  const ingredientsList = document.querySelector('.ingredients-list');
  const closeIcon = document.querySelector('.close-modul');
  const popUpDiv = document.querySelector('.pop-up-comment-div');
  const form = document.querySelector('.leave-comm');
  const inputName = document.querySelector('.input-name');
  const inputMess = document.querySelector('.input-mess');
  const commentsList = document.querySelector('.comments-list');
  const comments = document.querySelector('.comments-title');

  popUpDiv.style.display = 'block';

  displayIngredients(apiResult.ingredients, ingredientsList);

  getCommArray(pizzaId, commentsList);

  commCounterDisplay(commentCounterApi(pizzaId), comments);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendNewComm(pizzaId, inputName.value, inputMess.value);
    inputName.value = '';
    inputMess.value = '';
    setTimeout(() => {
      commentsList.innerHTML = '';
      getCommArray(pizzaId, commentsList);
      commCounterDisplay(commentCounterApi(pizzaId), comments);
    }, 500);
  });

  closePopUp(closeIcon, popUpDiv);
};

const displayPopUp = (btns) => {
  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      buildPopUp(e);
    });
  });
};

export default displayPopUp;
