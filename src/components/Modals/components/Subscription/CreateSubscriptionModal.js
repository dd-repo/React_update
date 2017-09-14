import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { Modal } from 'components';
import { createSubscription } from 'routes/admin/Dashboard/Users/Client/modules/subscriptions';
import { NewSubscriptionForm } from 'components/Forms/Subscription';

const CreateSubscriptionModal = props => {

  const _onSubmit = data => {
    props.hideModal()
    props.dispatch(createSubscription(data, props.user.id))
  }

  return (
    <Modal show={true} onHide={props.hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          { 'Create Subscription' }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewSubscriptionForm
          cards={props.cards}
          _onSubmit={_onSubmit}
          salesRep={props.initialValues.users}
        />
      </Modal.Body>
    </Modal>
  );
}

const mapActionCreators = {
  createSubscription
}

export default connect()(CreateSubscriptionModal);


