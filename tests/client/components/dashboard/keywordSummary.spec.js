import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Panel } from 'components';
import { keywords } from '../../../helpers';
import KeywordSummary from 'routes/client/Dashboard/components/KeywordSummary';

const setUp = () => {
  const wrapper = mount(<KeywordSummary keywords={keywords.all} />)
  return {
    wrapper
  }
}

describe('KeywordSummary Component', () => {
  it('should exist', () => {
    const { wrapper } = setUp()
    expect(wrapper).to.exist;
  })

  it('should receive keywords as props', () => {
    const { wrapper } = setUp()
    const props = wrapper.node.props
    expect(props.keywords).to.eql(keywords.all)
  })

  it('should render "Your Keywords"', () => {
    const { wrapper } = setUp()
    expect(wrapper.html()).includes('Your Search Terms')
  })

  it('should render each keyword', () => {
    const { wrapper } = setUp()
    expect(wrapper.html()).includes('keyword 1')
    expect(wrapper.html()).includes('keyword 2')
    expect(wrapper.html()).includes('keyword 3')
    expect(wrapper.html()).includes('keyword 4')
  })

  it('should render 4 Panels', () => {
    const { wrapper } = setUp()
    expect(wrapper.find(Panel).length).to.eql(4)
  })
})
