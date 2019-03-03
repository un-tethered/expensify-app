import 'react-dates/initialize';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

(async () => {
  ReactDOM.render(<p>Loading...</p>, document.getElementById('batistuta'));

  await store.dispatch(startSetExpenses());

  ReactDOM.render(jsx, document.getElementById('batistuta'));
})();
