import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, expense, wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };
  expense = expenses[0];
  const props = { expense, editExpense, removeExpense, history };
  wrapper = shallow(<EditExpensePage { ...props } />);
});

it('Should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

it('Should call editExpense when submitted', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expense);
  expect(editExpense).toHaveBeenLastCalledWith(expense);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

it('Should call removeExpense when button is clicked', () => {
  wrapper.find('button').simulate('click');
  expect(removeExpense).toBeCalled();
  expect(history.push).toHaveBeenLastCalledWith('/');
});
