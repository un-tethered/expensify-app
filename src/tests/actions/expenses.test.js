import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startAddExpense,
  addExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisistheuid'
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach(async () => {
  const expenseData = {};
  expenses.forEach(({ id, description, amount, note, createdAt }) => {
    expenseData[id] = { description, amount, note, createdAt }
  });
  await database.ref(`users/${uid}/expenses`).set(expenseData);
});

test('Should set up remove-expense action object', () => {
  const actionObject = removeExpense('baloney');
  expect(actionObject).toEqual({ id: 'baloney', type: 'REMOVE_EXPENSE' });
});

test('Should remove expense from database and store', async () => {
  const store = createMockStore(defaultAuthState);
  const [{ id, ...expense }] = expenses;
  const snapshotBeforeRemoval = await database.ref(`users/${uid}/expenses/${id}`).once('value');

  expect(snapshotBeforeRemoval.val()).toEqual(expense);

  await store.dispatch(startRemoveExpense(id));
  const [action] = store.getActions();

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id
  });

  const snapshotAfterRemoval = await database.ref(`users/${uid}/expenses/${id}`).once('value');

  expect(snapshotAfterRemoval.val()).toBe(null);
});



test('Should set up edit-expense action object', () => {
  const actionObject = editExpense('baloney', { foo: 'bar' });
  expect(actionObject).toEqual({
    id: 'baloney', type: 'EDIT_EXPENSE', updates: { foo: 'bar' }
  });
});

test('Should edit expense in database and store', async () => {
  const store = createMockStore(defaultAuthState);
  const [{ id, description, ...expense }] = expenses;
  const snapshotBeforeEdit = await database.ref(`users/${uid}/expenses/${id}/description`).once('value');

  expect(snapshotBeforeEdit.val()).toBe(description);

  const updates = { description: 'React is cool' };
  await store.dispatch(startEditExpense(id, updates));
  const [action] = store.getActions();

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id,
    updates
  });

  const snapshotAfterEdit = await database.ref(`users/${uid}/expenses/${id}`).once('value');

  expect(snapshotAfterEdit.val()).toEqual({
    ...expense,
    ...updates
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
  const store = createMockStore(defaultAuthState);
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

  const firebaseItem = await database.ref(`users/${uid}/expenses/${expenseId}`).once('value');

  expect(firebaseItem.val()).toEqual(expenseData);
});

test('Should add expense to database and store with default data', async () => {
  const store = createMockStore(defaultAuthState);
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

  const firebaseItem = await database.ref(`users/${uid}/expenses/${expenseId}`).once('value');

  expect(firebaseItem.val()).toEqual(expenseData);
});


test('Should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({ type: 'SET_EXPENSES', expenses });
});

test('Should fetch the expenses from firebase', async () => {
  const store = createMockStore(defaultAuthState);
  await store.dispatch(startSetExpenses());
  const [action] = store.getActions();

  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});
