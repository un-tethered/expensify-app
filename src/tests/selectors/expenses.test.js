import moment from 'moment';
import selector from '../../selectors/expenses';
import expenses from '../fixtures/expenses';



const filters = {
  text: '', sortBy: 'date', startDate: undefined, endDate: undefined
};

test('Should filter by text', () => {
  const filters = { ...filters, text: 'a' };
  expect(selector(expenses, filters)).toEqual([expenses[2], expenses[1]]);
});

test('Should filter by start date', () => {
  const filters = { ...filters, startDate: moment(0) };
  expect(selector(expenses, filters)).toEqual([expenses[0], expenses[2]]);
});

test('Should filter by end date', () => {
  const filters = { ...filters, endDate: moment(0) };
  expect(selector(expenses, filters)).toEqual([expenses[0], expenses[1]]);
});

test('Should sort by date', () => {
  expect(selector(expenses, filters)).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test('Should sort by amount', () => {
  const filters = { ...filters, sortBy: 'amount' };
  expect(selector(expenses, filters)).toEqual([expenses[0], expenses[2], expenses[1]]);
});