import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';
import expenses from '../fixtures/expenses';
import { filters } from '../fixtures/filters';

test('Should render nothing for zero expenses', () => {
  const props = {
    expenses,
    filters: { ...filters, text: 'foo bar' }
  };
  const wrapper = shallow(<ExpenseSummary {...props} />);

  expect(wrapper.find('div').text()).toBe('');
});

test('Should render ExpenseSummary for plural expenses', () => {
  const props = {
    expenses,
    filters: { ...filters, text: 'a' }
  };
  const wrapper = shallow(<ExpenseSummary {...props} />);

  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseSummary for singular expense', () => {
  const props = {
    expenses,
    filters: { ...filters, text: 'This' }
  };
  const wrapper = shallow(<ExpenseSummary {...props} />);

  expect(wrapper).toMatchSnapshot();
});
