import commentCounter from './comm-counter';

const data = [
  {
    'item-id': '25114444',
    name: 'Hope',
  },
  {
    'item-id': '257854444',
    name: 'Nicu',
  },
  {
    'item-id': '2556324444',
    name: 'Mike',
  },
];

describe('test add comment', () => {
  test('lenght of array to equal number of comments', () => {
    expect(commentCounter(data)).toBe(3);
  });
});
