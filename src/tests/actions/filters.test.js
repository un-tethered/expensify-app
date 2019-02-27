import moment from 'moment';
import {
  setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate
} from '../../actions/filters';

test('Should generate set-start-date action object', () => {
  const actionObject = setStartDate(moment(0));
  expect(actionObject).toEqual({ type: 'SET_START_DATE', startDate: moment(0)});
});

test('Should generate set-end-date action object', () => {
  const actionObject = setEndDate(moment(0));
  expect(actionObject).toEqual({ type: 'SET_END_DATE', endDate: moment(0)});
});

test('Should generate set-text-filter acton object when value is provided', () => {
  const actionObject = setTextFilter('foo');
  expect(actionObject).toEqual({ type: 'TEXT_FILTER', text: 'foo'});
});

test('Should generate set-text-filter object with text property defaulting to empty string when no value is provided', () => {
  const actionObject = setTextFilter();
  expect(actionObject).toEqual({ type: 'TEXT_FILTER', text: ''});
});

test('Should generate sort-by-date action object', () => {
  expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' });
});

test('Should generate sort-by-amount action object', () => {
  expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' });
});
