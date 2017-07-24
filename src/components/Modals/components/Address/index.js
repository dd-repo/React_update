import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { updateAddress } from 'routes/admin/Dashboard/User/modules/addresses';
import states from 'consts/data/states';

import {
    Col,
    Modal,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button,
    Divider
} from 'components';

const renderInput = ({ input, type }) => {
  return (
    <FormControl
      {...input}
      type={type}
    />
  )
}

const dropDownSelect = ({ input, children }) => (
  <FormControl {...input} componentClass='select'>
    { children }
  </FormControl>
)

const UpdateAddressModal = props => {

  const _onSubmit = (data) => {
    props.hideModal()
    props.dispatch(updateAddress(data))
  }

  return (
      <Modal show={ true } onHide={props.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            { 'Edit Address' }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={props.handleSubmit(_onSubmit)} horizontal>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Street
              </Col>
              <Col sm={9}>
                <Field
                  name='address1'
                  type='text'
                  component={renderInput}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                City
              </Col>
              <Col sm={9}>
                <Field
                  name='city'
                  type='text'
                  component={renderInput}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                State
              </Col>
              <Col sm={9}>
                <Field
                  name='state'
                  component={dropDownSelect}
                >
                  {
                    states.map((state, i) => (
                      <option value={state} key={i}>{state}</option>
                      ))
                  }
                </Field>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Zip
              </Col>
              <Col sm={9}>
                <Field
                  name='zip'
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
      </Modal.Body>
    </Modal>
  );
}

const reduxUserEdit = reduxForm({
  form: 'addressesEdit',
  enableReinitialize: true
})(UpdateAddressModal)

export default connect()(reduxUserEdit);
