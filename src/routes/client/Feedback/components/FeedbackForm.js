import React from 'react';
import { Field, reduxForm } from 'redux-form';
import ReduxFormInput from './ReduxFormInput';

import {
  Col,
  Panel,
  Checkbox,
  Button,
  Alert
} from 'components';
import classes from './feedback.scss';

const validate = values => {
  const errors = {}
  if(!values.body) {
    errors.body = 'Please provide feedback before sending'
  }
  return errors
}

export const FeedbackForm = props => {

  return (
    <Col className={ classes.centerCol } md={ 6 }>
      <Panel className={ classes.registerPanel }>
        <h2 className={ classes.panelHeader }>
          Feedback
        </h2>
        <p className='text-center m-b-3'>
          We value your feedback. Please tell us about your experiences with Clickadilly.
        </p>
        <form onSubmit={props.handleSubmit(props.submitFeedback)}>
          <Field
            name='subject'
            type='text'
            component={ReduxFormInput}
            placeHolder='subject'
            label='Subject'
          >
          </Field>

          <Field
            name='body'
            type='textarea'
            height='200px'
            componentClass='textarea'
            component={ReduxFormInput}
            placeHolder='Enter your feedback...'
            label='Feedback'
          >
          </Field>

          <Field
            className='feedback-body'
            name='contact'
            type='checkbox'
            component='input'
          >
          </Field>
          <span className='p-l-1'>
            May we contact you about your feedback?
          </span>
          <button
            className='full-width m-t-1 btn btn-primary'
            disabled={props.invalid || props.submitting}
            action="submit"
          >
            { props.isFetching ? 'Sending...' : 'Send' }
          </button>
        </form>
      </Panel>
    </Col>
  )
}

const reduxFeedbackForm = reduxForm({
  form: 'feedbackForm',
  validate
})(FeedbackForm)

export default reduxFeedbackForm;
