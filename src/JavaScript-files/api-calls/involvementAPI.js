// eslint-disable-next-line import/no-cycle
import { renderSucces, renderError } from '../reservations-folder/reserveation';

const INVOLVMENTAPPKEY = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/8FcrK9POw5EbfAJUs4DD/';

const LIKES = 'likes';

export const getLikes = async () => {
  const likes = await fetch(`${INVOLVMENTAPPKEY}likes`);
  const likesData = await likes.json();
  return likesData;
};

export const clickLikes = async (pizza) => {
  await fetch(`${INVOLVMENTAPPKEY}${LIKES}`, {
    method: 'POST',
    body: JSON.stringify({
      item_id: pizza.id,
    }),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};

export const getComm = async (pizzaId) => {
  try {
    const dataComm = await fetch(
      `${INVOLVMENTAPPKEY}comments?item_id=${pizzaId}`,
    );
    if (!dataComm.ok) throw new Error('No data to load');
    const comm = await dataComm.json();
    return comm;
  } catch (err) {
    return null;
  }
};

export const sendNewComm = (pizzaId, name, comment) => {
  fetch(`${INVOLVMENTAPPKEY}comments`, {
    method: 'POST',
    body: JSON.stringify({
      item_id: pizzaId,
      username: name,
      comment,
    }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });
};

export const submitReservation = async (
  pizzaId,
  name,
  dateStart,
  dateEnd,
  container,
) => {
  fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/8FcrK9POw5EbfAJUs4DD/reservations/',
    {
      method: 'POST',
      body: JSON.stringify({
        item_id: pizzaId,
        username: name,
        date_start: dateStart,
        date_end: dateEnd,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    },
  )
    .then((data) => {
      if (data.ok) {
        renderSucces(
          container,
          'open',
          'Thanks for your reservation!<br>You can come and pick up your pizza any time within your reservation period!<br>We will prepare it in 20 minutes!!',
        );
      } else {
        throw new Error('Please provide valid name and date');
      }
    })
    .catch((err) => {
      renderError(
        container,
        'error',
        `Something went wrong: ${err.message}. Try again`,
      );
    });
};

export const getReservations = async (pizzaId) => {
  const dataComm = await fetch(
    `${INVOLVMENTAPPKEY}reservations?item_id=${pizzaId}`,
  );
  const reservations = await dataComm.json();
  return reservations;
};
