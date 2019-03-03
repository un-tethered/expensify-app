import database from '../firebase/firebase';

export const addExpense = expense => ({ type: 'ADD_EXPENSE', expense });

export const startAddExpense = expenseData => async (dispatch) => {
  const {
    description = '', note = '', amount = 0, createdAt = 0
  } = expenseData || {};
  const expense = { description, note, amount, createdAt };

  const ref = await database.ref('expenses').push(expense);

  return dispatch(addExpense({ id: ref.key, ...expense }));
};

export const removeExpense = id => ({ type: 'REMOVE_EXPENSE', id });

export const editExpense = (id, updates) => ({ type: 'EDIT_EXPENSE', id, updates });