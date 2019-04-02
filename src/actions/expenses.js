import database from '../firebase/firebase';

export const addExpense = expense => ({ type: 'ADD_EXPENSE', expense });

export const startAddExpense = expenseData => async (dispatch, getState) => {
  const {
    description = '', note = '', amount = 0, createdAt = 0
  } = expenseData || {};
  const expense = { description, note, amount, createdAt };
  const { uid } = getState().auth;

  const ref = await database.ref(`users/${uid}/expenses`).push(expense);

  return dispatch(addExpense({ id: ref.key, ...expense }));
};

export const removeExpense = id => ({ type: 'REMOVE_EXPENSE', id });

export const startRemoveExpense = id => async (dispatch, getState) => {
  const { uid } = getState().auth;
  await database.ref(`users/${uid}/expenses/${id}`).remove();

  return dispatch(removeExpense(id));
};

export const editExpense = (id, updates) => ({ type: 'EDIT_EXPENSE', id, updates });

export const startEditExpense = (id, updates) => async (dispatch, getState) => {
  const { uid } = getState().auth;
  await database.ref(`users/${uid}/expenses/${id}`).update({
    ...updates
  });

  return dispatch(editExpense(id, updates));
};

export const setExpenses = expenses => ({ type: 'SET_EXPENSES', expenses });

export const startSetExpenses = () => async (dispatch, getState) => {
  const { uid } = getState().auth;
  const snapshot = await database.ref(`users/${uid}/expenses`).once('value');

  const expenses = [];

  snapshot.forEach((childSnapshot) => {
    expenses.push({
      id: childSnapshot.key,
      ...childSnapshot.val()
    });
  });
  
  return dispatch(setExpenses(expenses));
};
