import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ConnectFeedback from 'routes/client/Feedback';
import { Feedback } from 'routes/client/Feedback/Feedback';

const setUp = () => {
  const mockStore = configureMockStore()
  const store = mockStore({currentUser:{id: 1}})
  let api = sinon.stub()
  let promiseApi = new Promise((r) => r({}))
  api.returns(promiseApi)

  const props = {
    sendFeedback: api
  }

  const connectedWrapper = mount(
    <Provider store={store}>
      <ConnectFeedback location={{}} />
    </Provider>
  )

  const wrapper = shallow( <Feedback sendFeedback={props.sendFeedback} /> )

  return {
    connectedWrapper,
    wrapper,
    props
  }
}

describe('Feedback component', () => {

  it('should exist', () => {
    const { connectedWrapper } = setUp()
    expect(connectedWrapper).to.exist;
  })

  it('should render only Feedbackform component', () => {
    const { connectedWrapper } = setUp()
    expect(connectedWrapper.find('FeedbackForm')).to.have.length(1)
    expect(connectedWrapper.find('FeedbackSuccess')).to.have.length(0)
  })

  it('should render only FeedbackSuccess component', () => {
    const { wrapper } = setUp()
    wrapper.setState({success: true})
    expect(wrapper.find('FeedbackForm')).to.have.length(0)
    expect(wrapper.find('FeedbackSuccess')).to.have.length(1)
  })

  it('should render Alert component', () => {
    const { wrapper } = setUp()
    expect(wrapper.find('Alert')).to.have.length(0)
    wrapper.setState({errorMessage: 'error Message'})
    expect(wrapper.find('Alert')).to.have.length(1)
  })

  it('should render 2 Row components', () => {
    const { wrapper } = setUp()
    expect(wrapper.find('Row')).to.have.length(2)
  })

  it('should render 1 Col component', () => {
    const { wrapper } = setUp()
    expect(wrapper.find('Col')).to.have.length(1)
  })

  it('FeedbackForm has props submitFeedback that is a fn', () => {
    const { connectedWrapper } = setUp()
    const FeedbackForm = connectedWrapper.find('FeedbackForm')
    expect(FeedbackForm.node.props.submitFeedback).to.be.a('function')
  })

  it('FeedbackSuccess has prop resetForm that is a fn', () => {
    const { wrapper } = setUp()
    wrapper.setState({ success: true })
    const FeedbackSuccess = wrapper.find('FeedbackSuccess')
    expect(FeedbackSuccess.node.props.resetForm).to.be.a('function')
  })

  describe('Class methods', () => {
    const { wrapper, props } = setUp()
    const instance = wrapper.instance()

    it('onNext', () => {
      instance.onNext({type: 'FEEDBACK_SUCCESS'})
      expect(instance.onNext).to.have.been.callOnce
    })

    it('resetForm', () => {
      instance.resetForm()
      expect(instance.resetForm).to.have.been.callOnce
    })

    it('submitFeedback', () => {
      instance.submitFeedback()
      expect(instance.submitFeedback).to.have.been.callOnce
    })
  })
})
