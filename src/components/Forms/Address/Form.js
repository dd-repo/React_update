import React from 'react';
import { reduxForm, Field } from 'redux-form';

import {
  ReduxFormInput,
  ReduxFormSelect
} from '../components'
import {
  ControlLabel,
  FormGroup,
  Button,
  Modal,
  Form,
  Row,
  Col
} from 'components';
import formFields from 'consts/formFields';

const AddressForm = props => {
  const {
    onSubmit,
    hideModal,
    handleSubmit
  } = props

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Row>
          <Col lg={12}>
            <ReduxFormInput field={formFields.address} />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col lg={4}>
            <ReduxFormInput field={formFields.city} />
          </Col>
          <Col lg={4}>
            <label>
              State
            </label>
            <ReduxFormSelect field={formFields.state} />
          </Col>
          <Col lg={4}>
            <ReduxFormInput field={formFields.zipcode} />
          </Col>
        </Row>
      </FormGroup>
      <Modal.Footer>
        <Button onClick={hideModal}>Close</Button>
        <Button bsStyle='primary' type='submit'>Save</Button>
      </Modal.Footer>
    </Form>
  )
}

const reduxAddressEditForm = reduxForm({
  form: 'addressEdit',
  enableReinitialize: true
})(AddressForm)

export default reduxAddressEditForm;
