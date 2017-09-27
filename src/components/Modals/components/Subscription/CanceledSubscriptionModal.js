import React, { PropTypes } from 'react';
import {
  Table,
  Row,
  Col,
  Button,
  Modal
} from 'components'
import { formatDate } from 'utils';
import { infosweepPhoneNumber } from 'consts/infosweepInfo';

const CanceledSubscription = props => {
  return (
    <Modal  show={true} onHide={props.hideModal}>
      <Modal.Header>
        <Modal.Title>Cancel Subscription</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className='text-center'>
          <Col lg={ 12 }>
            <br />
            <h2>
              Subscription Canceled
            </h2>
            <i className='fa fa-check fa-5x text-success'></i>
            <p>
              Your account is active until {formatDate(props.modalProps.next_payment)}.
              If you have any questions or would like to re-activate your subscription please call us at { infosweepPhoneNumber }.
            </p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.hideModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

CanceledSubscription.propTypes = {
  hideModal: PropTypes.func.isRequired
}

export default CanceledSubscription;



