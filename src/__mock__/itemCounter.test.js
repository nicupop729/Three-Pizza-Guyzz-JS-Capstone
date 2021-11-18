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

test(, () => {
  
});

describe('test add Items', () => {
  test('should output the total number of Item in the array..', () => {
    expect(itemCounter(data)).toBe(3);
  });
});