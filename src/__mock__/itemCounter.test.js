import itemCounter from './itemCounter.js';

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

test('should output the total number of Item in the array..', () => {
  itemCounter(data);
  expect(data.length).toBe(3);
});
