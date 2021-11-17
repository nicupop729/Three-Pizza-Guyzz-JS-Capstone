import { getLikes } from './hitApi.js';


const displayPizza = document.querySelector('.display-pizza');
const showPizza = async (value) => {
  value.forEach((dat) => {
    const divContainer = document.createElement('div');
    divContainer.className = 'pizza-container';
    const image = document.createElement('img');
    image.alt = 'pizza-image';
    image.src = dat.image_url;

    const likes = document.createElement('span');
    likes.innerHTML = '\u2661';
    likes.className = 'like-me';

    const namePub = document.createElement('span');
    namePub.innerHTML = dat.publisher;

    const namePizz = document.createElement('span');
    namePizz.innerHTML = '5 likes';
    

    namePizz.className = 'likes-span';

    const commentBtn = document.createElement('button');
    commentBtn.innerHTML = 'Comment';

    const reservationBtn = document.createElement('button');
    reservationBtn.innerHTML = 'Reservation';

    likes.addEventListener('click', async () => {
      await fetch(
        'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/8FcrK9POw5EbfAJUs4DD/likes',
        {
          method: 'POST',
          body: JSON.stringify({
            item_id: dat.id,
          }),
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        }
      );
    });

    divContainer.appendChild(image);
    divContainer.appendChild(likes);
    divContainer.appendChild(namePizz);
    divContainer.appendChild(namePub);
    divContainer.appendChild(commentBtn);
    divContainer.appendChild(reservationBtn);


    displayPizza.appendChild(divContainer);
  });

  
};



export default showPizza;
