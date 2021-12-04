/* eslint-disable import/no-cycle */
import showPizza from '../home-folder/home.js';
import itemCounter from '../home-folder/counter.js';

const apiKey = '846893fa-87f6-438c-b699-78f4d8b5b5a0';
const url = 'https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=';

const receipeUrl = 'https://forkify-api.herokuapp.com/api/v2/recipes/';

export const getPizza = async () => {
  const pizza = await fetch(`${url}${apiKey}`);
  const pizzaData = await pizza.json();
  const data = pizzaData.data.recipes.slice(1, pizzaData.lenght);
  showPizza(data);
  itemCounter(data);
};

export const getRecipe = async (id) => {
  const pizza = await fetch(`${receipeUrl}${id}?key=${apiKey}`);
  const pizzaData = await pizza.json();
  const data = pizzaData.data.recipe;
  const { publisher } = data;
  const { ingredients } = data;
  // eslint-disable-next-line camelcase
  const { image_url } = data;
  const { servings } = data;
  const { title } = data;
  // eslint-disable-next-line camelcase
  const { source_url } = data;
  // eslint-disable-next-line camelcase
  const { cooking_time } = data;

  return {
    publisher,
    ingredients,
    servings,
    image_url,
    title,
    source_url,
    cooking_time,
  };
};

export const getResipe = async (id) => {
  const response = await fetch(`${receipeUrl}${id}?key=${apiKey}`);
  const cloud = await response.json();
  const recipe = cloud.data.recipe.ingredients;
  const image = cloud.data.recipe.image_url;
  // eslint-disable-next-line prefer-destructuring
  const title = cloud.data.recipe.title;

  return { recipe, image, title };
};
