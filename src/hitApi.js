// eslint-disable-next-line import/no-cycle
import showPizza from './home.js';

const apiKey = 'c9510895-3e98-4f84-a4ff-c56d29bdf5e0';
const url = 'https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=';

const receipeUrl = 'https://forkify-api.herokuapp.com/api/v2/recipes/';

const getPizza = async () => {
  const pizza = await fetch(`${url}${apiKey}`);
  const pizzaData = await pizza.json();
  const data = pizzaData.data.recipes;
  showPizza(data);
};

export default getPizza;

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

  return {
    publisher,
    ingredients,
    servings,
    image_url,
    title,
    source_url,
  };
};
