import 'react-dates/initialize';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import selector from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();
store.dispatch(addExpense({ description: 'Water bill', amount: 3500, createdAt: 2000 }));
store.dispatch(addExpense({ description: 'Light bill', amount: 10000, createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Electricity bill', amount: 6000, createdAt: 3500 }));
store.dispatch(addExpense({ description: 'Rent', amount: 2000, createdAt: 3000 }));

console.log(selector(store.getState().expenses, store.getState().filters));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('batistuta'));
