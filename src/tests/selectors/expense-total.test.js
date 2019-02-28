import expenseTotal from '../../selectors/expense-total';
import expenses from '../fixtures/expenses';

it('Should get total expense if array supplied has more than one element', () => {
  const total = expenseTotal(expenses);
  expect(total).toBe(1550);
});

it('Should get expense if array with one element is supplied', () => {
  const total = expenseTotal([expenses[0]]);
  expect(total).toBe(1000);
});

it('Should return 0 if empty array is supplied', () => {
  expect(expenseTotal([])).toBe(0);
});
