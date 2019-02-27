import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, filters2 } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  const props = {
    filters, setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate
  };
  wrapper = shallow(<ExpenseListFilters {...props} />);
});

test('Should render ExpenseListFilters', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseListFilters with data', () => {
  wrapper.setProps({ filters: filters2 });
  expect(wrapper).toMatchSnapshot();
});

test('Should handle text filter change', () => {
  const value = 'bar';
  wrapper.find('input').simulate('change', { target: { value } });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('Should sort by date', () => {
  wrapper.setProps({ filters: filters2 });
  const value = 'date';
  wrapper.find('select').simulate('change', { target: { value } });
  expect(sortByDate).toHaveBeenCalled();
});

test('Should sort by amount', () => {
  const value = 'amount';
  wrapper.find('select').simulate('change', { target: { value } });
  expect(sortByAmount).toHaveBeenCalled();
});

test('Should handle date changes', () => {
  const { text, sortBy, ...dates } = filters2;
  wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')(dates);
  expect(setStartDate).toHaveBeenLastCalledWith(dates.startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(dates.endDate);
});

test('Should handle date focus changes', () => {
  const calendarFocused = 'startDate';
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});
