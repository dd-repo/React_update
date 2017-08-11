import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Dashboard from 'routes/client/Dashboard/components/Dashboard';

const setUp = () => {
  const keywords = {
    all: [],
    currentKeyword: {}
  }

  const wrapper = shallow(<Dashboard keywords={keywords} />)

  return {
    wrapper
  }
}

describe('Dashboard Component', () => {
  it('should exist', () => {
    const { wrapper } = setUp()
    expect(wrapper).to.exist;
  })
})
