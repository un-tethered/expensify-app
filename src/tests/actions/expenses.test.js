import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach(async () => {
  const expenseData = {};
  expenses.forEach(({ id, description, amount, note, createdAt }) => {
    expenseData[id] = { description, amount, note, createdAt }
  });
  await database.ref('expenses').set(expenseData);
});

test('Should set up remove-expense action object', () => {
  const actionObject = removeExpense('baloney');
  expect(actionObject).toEqual({ id: 'baloney', type: 'REMOVE_EXPENSE' });
});

test('Should set up edit-expense action object', () => {
  const actionObject = editExpense('baloney', { foo: 'bar' });
  expect(actionObject).toEqual({
    id: 'baloney', type: 'EDIT_EXPENSE', updates: { foo: 'bar' }
  });
});

test('Should set up add-expense action object with data supplied', () => {
  const actionObject = addExpense(expenses[2]);
  expect(actionObject).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('Should add expense to database and store', async () => {
  const store = createMockStore({});
  const { id, ...expenseData } = expenses[2];

  await store.dispatch(startAddExpense(expenseData));
  
  const { 0: action, 0: { expense: { id: expenseId } } } = store.getActions();

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseData
    }
  });

  const firebaseItem = await database.ref(`expenses/${expenseId}`).once('value');

  expect(firebaseItem.val()).toEqual(expenseData);
});

test('Should add expense to database and store with default data', async () => {
  const store = createMockStore({});
  const expenseData = {
    description: '',
    amount: 0,
    createdAt: 0,
    note: ''
  };
  await store.dispatch(startAddExpense());
  const { 0: action, 0: { expense: { id: expenseId } } } = store.getActions();

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseData
    }
  });

  const firebaseItem = await database.ref(`expenses/${expenseId}`).once('value');

  expect(firebaseItem.val()).toEqual(expenseData);
});

test('Should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({ type: 'SET_EXPENSES', expenses });
});

test('Should fetch the expenses from firebase', async () => {
  const store = createMockStore({});
  await store.dispatch(startSetExpenses());
  const [action] = store.getActions();

  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});
