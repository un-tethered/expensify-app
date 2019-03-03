import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('Should create default state for expenses', () => {
  const state = expensesReducer(undefined, {
    type: '@@INIT'
  });
  expect(state).toEqual([]);
});

test('Should remove expenses by id', () => {
  const state = expensesReducer(expenses, {
    id: expenses[1].id,
    type: 'REMOVE_EXPENSE'
  });

  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('Should not remove expenses by id if id does not exist', () => {
  const state = expensesReducer(expenses, {
    id: 6,
    type: 'REMOVE_EXPENSE'
  });

  expect(state).toEqual(expenses);
});

test('Should add an expense', () => {
  const state = expensesReducer( expenses, {
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });

  expect(state).toEqual([...expenses, expenses[2]]);
});

test('Should edit an expense', () => {
  const state = expensesReducer(expenses, {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: { description: 'bar' } });

  expect(state[1].description).toBe('bar');
});

test('Should not edit expense if id does not exist', () => {
  const state = expensesReducer(expenses, {
    id: 6,
    type: 'EDIT_EXPENSE'
  });

  expect(state).toEqual(expenses);
});

test('Should set expenses', () => {
  const [oldExpenses, ...newExpenses] = expenses;
  const state = expensesReducer([oldExpenses], {
    type: 'SET_EXPENSES',
    expenses: newExpenses
  });

  expect(state).toEqual(newExpenses);
  expect(state.includes(oldExpenses[0])).toBe(false);
});