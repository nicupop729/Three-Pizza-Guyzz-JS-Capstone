import showPizza from "./home.js";
import itemCounter from "./counter.js";

const apiKey = "846893fa-87f6-438c-b699-78f4d8b5b5a0";
const url =
  "https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=";
const InvolmentAppKey =
  "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/8FcrK9POw5EbfAJUs4DD/";

const receipeUrl = "https://forkify-api.herokuapp.com/api/v2/recipes/";
export const getPizza = async () => {
  const pizza = await fetch(`${url}${apiKey}`);
  const pizzaData = await pizza.json();
  const data = pizzaData.data.recipes;
  showPizza(data);
  itemCounter(data);
};

export const getLikes = async () => {
  const likes = await fetch(`${InvolmentAppKey}likes`);
  const likesData = await likes.json();
  return likesData;
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

  return {
    publisher,
    ingredients,
    servings,
    image_url,
    title,
    source_url,
  };
};

getLikes();
