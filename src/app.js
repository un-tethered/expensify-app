import 'react-dates/initialize';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import AppRouter, { history } from './router/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import { firebase } from './firebase/firebase';
import './styles/style.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let isRendered = false;
const renderApp = () => {
  if(!isRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    isRendered = true;
  }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged(async (user) => {
  if(user) {
    store.dispatch(login(user.uid));
    await store.dispatch(startSetExpenses());
    renderApp();

    if(history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
