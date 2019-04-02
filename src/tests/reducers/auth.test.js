import authReducer from '../../reducers/auth';

it('Should set default state', () => {
  const state = authReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({});
});

it('Should set default state', () => {
  const uid = expect.any(String);
  const actionObject = {
    type: 'LOGIN',
    payload: { uid }
  };
  const state = authReducer(undefined, actionObject);

  expect(state).toEqual({ uid });
});

it('Should set default state', () => {
  const uid = expect.any(String);
  const actionObject = {
    type: 'LOGIN',
    payload: { uid }
  };
  const state = authReducer(undefined, actionObject);

  expect(state).toEqual({ uid });
});

it('Should set logout state', () => {
  const state = authReducer(undefined, { type: 'LOGOUT' });
  expect(state).toEqual({});
});
