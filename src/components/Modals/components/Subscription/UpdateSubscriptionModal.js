import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { Modal } from 'components'
import { updateSubscription } from 'routes/admin/Users/Client/modules/subscriptions'
import { UpdateSubscriptionForm } from 'components/Forms/Subscription'

const SubscriptionEditModal = props => {
  const _onSubmit = data => {
    props.hideModal()
    props.dispatch(updateSubscription(data))
  }
  return (
    <Modal show onHide={props.hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {'Edit Subscription'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdateSubscriptionForm
          initialValues={props.initialValues}
          cards={props.cards}
          _onSubmit={_onSubmit}
        />
      </Modal.Body>
    </Modal>
  )
}

export default connect()(SubscriptionEditModal)

