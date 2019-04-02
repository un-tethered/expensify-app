import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logout } from '../../actions/auth';

const createMockStore = configureMockStore([thunk]);
let store;

beforeEach(() => {
  store = createMockStore({});
})

it('Should fire login action', () => {
  const uid = expect.any(String);

  store.dispatch(login(uid));

  const [action] = store.getActions();
  const expectedAction = {
    type: 'LOGIN',
    payload: { uid }
  };

  expect(action).toEqual(expectedAction);
});

it('Should fire logout action', () => {
  store.dispatch(logout());

  const [action] = store.getActions();
  const expectedAction = { type: 'LOGOUT' };

  expect(action).toEqual(expectedAction);
});
