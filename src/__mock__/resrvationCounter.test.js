import reservationCounter from './resrvationCounter.js';

const data = [
  {
    username: 'John',
    date_start: '2020-12-17',
    date_end: '2020-12-18',
  },
  {
    username: 'Jane',
    date_start: '2021-1-12',
    date_end: '2021-1-17',
  },
];

test('Should retunr the total number of reservation API', () => {
  expect(reservationCounter(data)).toBe(2);
});
