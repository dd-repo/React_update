import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { updateAddress } from 'routes/admin/Users/Client/modules/addresses';
import states from 'consts/states';
import { AddressForm } from 'components/Forms'
import { Modal } from 'components';

const UpdateAddressModal = props => {

  const _onSubmit = (data) => {
    const payload = {
      id: data.id,
      address1: data.address,
      city: data.city,
      state: data.state.value,
      zipcode: data.zipcode
    }
    props.hideModal()
    props.dispatch(updateAddress(payload))
  }

  const initialValues = {
    id: props.initialValues.id,
    address: props.initialValues.address1,
    city: props.initialValues.city,
    state: props.initialValues.state,
    zipcode: props.initialValues.zip
  }

  return (
      <Modal show={ true } onHide={props.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            { 'Edit Address' }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddressForm
            onSubmit={_onSubmit}
            initialValues={initialValues}
            hideModal={props.hideModal}
          />
      </Modal.Body>
    </Modal>
  );
}


export default connect()(UpdateAddressModal);

