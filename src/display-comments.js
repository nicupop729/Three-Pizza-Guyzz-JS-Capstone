// eslint-disable-next-line import/no-cycle
import { getRecipe } from './hitApi';

const buildPopUp = async (e) => {
  const object = await getRecipe(e.target.id);
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
          <p class="ingredients">Ingredients</p>
          <ul class="ingredients-list">
          </ul>
        </div>
      </div>
      <span class="close-modul"><ion-icon name="close-outline"></ion-icon></span>
    </div>
      `;

  document.body.insertAdjacentHTML('afterbegin', htmlText);

  const ingredientsList = document.querySelector('.ingredients-list');
  const closeIcon = document.querySelector('.close-modul');
  const popUpDiv = document.querySelector('.pop-up-comment-div');

  // popUpDiv.style.display = 'block';

  object.ingredients.forEach((ingr) => {
    const textHTML = `
    <li class="ingredient">${ingr.quantity === null ? '' : ingr.quantity} ${
  ingr.unit === 'tsp' ? 'teaspoons' : ingr.unit
} ${ingr.unit === 'tsp' || ingr.unit === 'cup' ? 'of' : ''} ${
  ingr.description
}</li>`;
    ingredientsList.insertAdjacentHTML('beforeend', textHTML);
  });
  closeIcon.addEventListener('click', () => {
    popUpDiv.style.display = 'none';
  });
};

const displayPopUp = (btns) => {
  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      buildPopUp(e);
    });
  });
};

export default displayPopUp;
