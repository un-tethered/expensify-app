import numeral from '../../util/numeral-locale-naira';

it('Should change library to use Naira', () => {
  const money = numeral(100000).format('$0,0.00');
  expect(money).toBe('₦100,000.00');
});