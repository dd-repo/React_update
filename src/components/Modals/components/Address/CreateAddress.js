import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createAddress } from 'routes/admin/Dashboard/User/modules/addresses';
import states from 'consts/data/states';
import { AddressForm } from 'components/Forms'
import { Modal } from 'components';

const CreateAddressModal = props => {

  const _onSubmit = (data) => {
    const payload = {
      address1: data.address,
      city: data.city,
      state: data.state.value,
      zipcode: data.zipcode,
      account_id: props.account.id
    }
    props.hideModal()
    props.dispatch(createAddress(payload))
  }

  return (
      <Modal show={ true } onHide={props.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            { 'Add Address' }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddressForm
            onSubmit={_onSubmit}
            hideModal={props.hideModal}
          />
      </Modal.Body>
    </Modal>
  );
}


export default connect()(CreateAddressModal);


