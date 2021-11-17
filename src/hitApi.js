import showPizza from './home.js';
import likeCounter from './showLikes.js';

const apiKey = '846893fa-87f6-438c-b699-78f4d8b5b5a0';
const url =
  'https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=';

const getPizza = async () => {
  const pizza = await fetch(`${url}${apiKey}`);
  const pizzaData = await pizza.json();
  const data = pizzaData.data.recipes;
  showPizza(data);
};

export const getLikes = async () => {
  const likes = await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/8FcrK9POw5EbfAJUs4DD/likes'
  );
  const likesData = await likes.json();
  likesData.forEach((element) => {
    const upperLike = element;
    return upperLike;
  });
};

// getLikes();
export default getPizza;
