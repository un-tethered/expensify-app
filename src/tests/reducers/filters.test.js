import moment from 'moment';
import filterReducer from '../../reducers/filters';


const defaultState = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};

test('Should set up default filter values', () => {
  const state = filterReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(defaultState);
});

test('Should set sortBy to amount', () => {
  const state = filterReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});

test('Should set sortBy to date', () => {
  const state = filterReducer({ ...defaultState, sortBy: 'amount' }, { type: 'SORT_BY_DATE' });
  expect(state.sortBy).toBe('date');
});

test('Should set text filter', () => {
  const state = filterReducer(undefined, { type: 'TEXT_FILTER', text: 'foo' });
  expect(state.text).toBe('foo');
});

test('Should set startDate filter', () => {
  const state = filterReducer(undefined, { type: 'SET_START_DATE', startDate: moment(0) });
  expect(state.startDate).toEqual(moment(0));
});

test('Should set endDate filter', () => {
  const state = filterReducer(undefined, { type: 'SET_END_DATE', endDate: moment(0) });
  expect(state.endDate).toEqual(moment(0));
});
