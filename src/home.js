import { getLikes } from './hitApi.js';

// eslint-disable-next-line import/no-cycle
import displayPopUp from './display-comments.js';

const apiEndPoint =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/8FcrK9POw5EbfAJUs4DD/likes';

const displayPizza = document.querySelector('.display-pizza');
const showPizza = async (value) => {
  const likedData = [];
  await getLikes().then((theLike) =>
    theLike.forEach((datLike) => {
      likedData.push(datLike);
    })
  );

  value.forEach((dat) => {
    const counter = document.querySelector('.item-counter');
    counter.innerHTML = `Total Pizza: ${value.length}`;
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

    const commentBtn = document.createElement('button');
    commentBtn.innerHTML = 'Comment';

    const reservationBtn = document.createElement('button');
    reservationBtn.id = dat.id;
    reservationBtn.classList.add('reservation-btns');
    reservationBtn.innerHTML = 'Reservation';

    likes.addEventListener('click', async () => {
      await fetch(apiEndPoint, {
        method: 'POST',
        body: JSON.stringify({
          item_id: dat.id,
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
      window.location.reload();
    });

    divContainer.appendChild(image);
    divContainer.appendChild(likes);
    divContainer.appendChild(namePub);

    for (let i = 0; i < likedData.length; i += 1) {
      const namePizz = document.createElement('span');
      if (likedData[i].item_id === dat.id) {
        namePizz.innerHTML = `${likedData[i].likes} Likes`;
        divContainer.insertBefore(namePizz, namePub);
      }
    }

    divContainer.appendChild(commentBtn);
    divContainer.appendChild(reservationBtn);

    displayPizza.appendChild(divContainer);
  });
};

export default showPizza;
