import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

it('Should render ExpenseForm without data passed', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

it('Should render ExpenseForm with data passed', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

it('Should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });
  expect(wrapper.state('error')).toBe('Please enter description and amount');
  expect(wrapper).toMatchSnapshot();
});

it('Should set description state on input change', () => {
  const value = 'foo bar';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('description')).toBe(value);
})

it('Should set note state on input change', () => {
  const value = 'lorem ipsum dolor';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('note')).toBe(value);
});

it('Should set amount state on valid input', () => {
  const value = '12.90';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe(value);
});

it('Should not set amount state on invalid input', () => {
  const value = '12.900';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe('');
});

it('Should call onSubmit prop for valid form submission', () => {
  const onSubmit = jest.fn();
  const { id, ...expense } = expenses[0];
  const props = { onSubmit, expense };

  const wrapper = shallow(<ExpenseForm {...props} />);

  wrapper.find('form').simulate('submit', { preventDefault: () => {} });

  expect(wrapper.state('error')).toBe('');
  expect(onSubmit).toHaveBeenLastCalledWith(expense);
});

it('Should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

it('Should change focused state when focus changes', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper.state('calendarFocused')).toBe(false);
  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused: true });
  expect(wrapper.state('calendarFocused')).toBe(true);
});
