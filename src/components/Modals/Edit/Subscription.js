import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import {
    Col,
    Modal,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from 'components';

import SubscriptionForm from 'components/Forms/Subscription';

const SubscriptionEditModal = props => {

  const _onSubmit = data => {
    props.submitForm(data, 'subscription', 'patch')
  }

  return (
    <Modal show={ props.show } onHide={() => { props.toggleModal('subscriptionEditModal', false) }}>
      <Modal.Header closeButton>
        <Modal.Title>
          { 'Edit Subscription' }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SubscriptionForm
          initialValues={props.initialValues}
          cards={props.cards}
          _onSubmit={_onSubmit}

        />
      </Modal.Body>
    </Modal>
  );
}

SubscriptionEditModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func
};

SubscriptionEditModal.defaultProps = {
    onClose: () => { }
};

export default SubscriptionEditModal;
