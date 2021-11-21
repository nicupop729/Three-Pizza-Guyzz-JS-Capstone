// eslint-disable-next-line import/no-cycle
import { getLikes } from '../api-calls/involvementAPI';

const showLiked = async (likedData, dat, namePizz) => {
  likedData = [];
  await getLikes().then((theLike) => theLike.forEach((datLike) => {
    likedData.push(datLike);
  }));
  likedData.forEach((lik) => {
    if (lik.item_id === dat.id) {
      if (lik.likes > 1) {
        namePizz.textContent = `${lik.likes} Likes`;
      }
      if (lik.likes === 1) {
        namePizz.textContent = `${lik.likes} Like`;
      }
    }
  });
};

export default showLiked;
