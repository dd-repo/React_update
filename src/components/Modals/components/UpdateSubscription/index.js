import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
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
import { updateSubscription } from 'routes/admin/Dashboard/User/modules/subscriptions';
import SubscriptionForm from 'components/Forms/Subscription';

const SubscriptionEditModal = props => {

  const _onSubmit = data => {
    props.hideModal()
    props.dispatch(updateSubscription(data))
  }

  return (
    <Modal show={true} onHide={props.hideModal}>
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

const mapStateToProps = state => ({
   cards: state.user.cards
})
export default connect(
  mapStateToProps
)(SubscriptionEditModal);
