import React from 'react';
import { reduxForm, Field } from 'redux-form';

import {
  Modal,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'components'

const renderInput = ({ input, type }) => {
  return (
    <FormControl
      {...input}
      type={type}
    />
  )
}

const KeywordForm = props => (
  <Form onSubmit={props.handleSubmit(props.onSubmit)} horizontal>
    <FormGroup>
      <Col componentClass={ControlLabel} sm={1}>
      </Col>
      <Col sm={10}>
        <Field
          name='label'
          type='text'
          component={renderInput}
        />
      </Col>
    </FormGroup>
    <Modal.Footer>
      <Button onClick={props.hideModal}>Close</Button>
      <Button bsStyle='primary' type='submit'>Save</Button>
    </Modal.Footer>
  </Form>
)

const reduxKeywordForm = reduxForm({
  form: 'keywordForm'
})(KeywordForm)

export default reduxKeywordForm;

