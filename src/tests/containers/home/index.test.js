import React from 'react'
import { mount, shallow, simulate, update, dive, debug } from 'enzyme'
import Counter from '../../../containers/home'

import { Provider } from 'react-redux'
import store from '../../../store'

import '../../setup'

it('Increment count via button click', () => {

  const wrapper = mount(<Provider store={store}><Counter/></Provider>);
  const btn = wrapper.children().find('#increment');
  const initialState = wrapper.find('Home').props().count;
  btn.simulate('click');
  const modifiedState = wrapper.find('Home').props().count;
  expect(modifiedState).toEqual(initialState + 1)
})
