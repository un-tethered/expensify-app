import React from 'react';
import { LoginPage } from '../../components/LoginPage';
import { shallow } from 'enzyme';

test('Should render login page', () => {
  const wrapper = shallow(<LoginPage startLogin={() => {}}/>);
  expect(wrapper).toMatchSnapshot();
});

test('Should call startLogin prop on click', () => {
  const startLogin = jest.fn();
  const wrapper = shallow(<LoginPage startLogin={startLogin}/>);
  wrapper.find('button').simulate('click');
  expect(startLogin).toHaveBeenCalled();
});
