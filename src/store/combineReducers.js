import { combineReducers } from 'redux';
import authReducer from '../reducers/auth';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

export default combineReducers({
  auth: authReducer,
  expenses: expensesReducer,
  filters: filtersReducer
});
