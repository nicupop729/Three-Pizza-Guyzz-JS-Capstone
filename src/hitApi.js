import showPizza from './home.js';

const apiKey = 'c9510895-3e98-4f84-a4ff-c56d29bdf5e0';
const url =
  'https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=';

const getPizza = async () => {
  const pizza = await fetch(`${url}${apiKey}`);
  const pizzaData = await pizza.json();
  const data = pizzaData.data.recipes;
  showPizza(data);
};

export default getPizza;
