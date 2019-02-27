import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('Should set up remove-expense action object', () => {
  const actionObject = removeExpense('baloney');
  expect(actionObject).toEqual({ id: 'baloney', type: 'REMOVE_EXPENSE' });
});

test('Should set up edit-expense action object', () => {
  const actionObject = editExpense('baloney', { foo: 'bar' });
  expect(actionObject).toEqual({ id: 'baloney', type: 'EDIT_EXPENSE', updates: { foo: 'bar' } });
});

test('Should set up add-expense action object with data supplied', () => {
  const payload = {
    description: 'The hills have eyes',
    amount: 4000,
    createdAt: 500000,
    note: 'Hide your lies'
}
  const actionObject = addExpense(payload);
  expect(actionObject).toEqual({ type: 'ADD_EXPENSE', expense: { ...payload, id: expect.any(String) } });
});

test('Should set up add-expense action object with defaults when data is not supplied', () => {
  const actionObject = addExpense();
  expect(actionObject).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      description: '',
      amount: 0,
      createdAt: 0,
      note: '',
      id: expect.any(String)
    }
  });
});