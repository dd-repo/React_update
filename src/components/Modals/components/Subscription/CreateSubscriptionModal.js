import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { Modal } from 'components';
import { createSubscription } from 'routes/admin/Users/Client/modules/subscriptions';
import { NewSubscriptionForm } from 'components/Forms/Subscription';

const CreateSubscriptionModal = props => {

  const _onSubmit = data => {
    const params = {
      card_id: data.card.value,
      plan: data.plan.value,
      sales_rep_id: data.salesRep.value,
      next_payment: data.next_payment
    }
    props.hideModal()
    props.dispatch(createSubscription(params, props.user.id))
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
          salesReps={props.initialValues.users}
        />
      </Modal.Body>
    </Modal>
  );
}

const mapActionCreators = {
  createSubscription
}

export default connect()(CreateSubscriptionModal);


