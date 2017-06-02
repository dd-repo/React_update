import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

import UpdatePasswordForm from './UpdatePasswordForm'
import {
  Alert,
  Panel,
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel,
  Radio,
  Button,
  Divider,
  Modal,
} from 'components';

import { formatDate } from 'utils/dateHelper';
import { Colors } from 'consts';

import classes from './accountEdit.scss';

const AccountEdit = (props) => {
  const {
    disableButton,
    submitForm,
    passwordErrorMsg,
    alert,
    cancelSubscription,
    showModal,
    hideModal,
    confirmCancel,
    subscription
  } = props

  const renderModal = (
    <Modal  show={showModal} onHide={hideModal}>
      <Modal.Header>
        <Modal.Title>Cancel Subscription</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to cancel your subscription?</p>
      </Modal.Body>
        <Modal.Footer>
          <Button onClick={hideModal}>Close</Button>
          <Button bsStyle="danger" onClick={() => cancelSubscription()}>Cancel Subscription</Button>
        </Modal.Footer>
      </Modal>
  )

  const renderMessage = (
    alert &&
      <Alert bsStyle={alert.style}>
        <i className="fa fa-fw text-success m-r-1"></i>
        {alert.message}
      </Alert>
  )

  const date = (
    subscription.cancelDate &&
      formatDate(subscription.cancelDate)
  )

  const renderSubscription = (
    subscription.isActive ?
          renderInactiveSubscription
        :
      renderActiveSubscription
  )

  const renderActiveSubscription = (
    <div>
      <p>
        Once you cancel your subscription you can re-active any time
      </p>
      <Button
        bsStyle='danger'
        className='btn-outline'
        onClick={() => confirmCancel()}
      >
        Cancel Subscription
      </Button>
    </div>
  )

  const renderInactiveSubscription = (
    <div>
      <p>
        Your subscription will end on {date}. Please call us at (844) 641-7829 to re-active
      </p>
    </div>
  )

  return (
    <div>
      {renderMessage}
      {renderModal}
      <Panel
        className='m-b-2'
        header={
          <h4 className='panel-title'>
            Account Edit
          </h4>
          }
          footer={
            <div>
              <i className="fa fa-fw fa-support m-r-1"></i>
              <span>
                If you have trouble with changing your password, you can contact us at (844) 641-7829.
              </span>
              { ' ' }
              <Link to='/apps/faq'>
                We can help.
              </Link>
            </div>
            }
          >

          <UpdatePasswordForm
            disableButton={disableButton}
            submitForm={submitForm}
            passwordErrorMsg={passwordErrorMsg}
          />

      </Panel>

        <Panel
          header={
            <h4 className='panel-title'>
              Cancel Subscription
            </h4>
            }
            footer={
              <div>
                <i className="fa fa-fw fa-exclamation-circle m-r-1"></i>
                <span></span>
              </div>
              }
            >
              {
                subscription.isActive ?
                  renderActiveSubscription
                    :
                    renderInactiveSubscription
              }
            </Panel>
          </div>
  )
}

export default AccountEdit;
