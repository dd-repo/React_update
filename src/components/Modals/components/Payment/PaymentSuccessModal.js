import React from 'react'
import classes from './paymentModal.scss'
import {
  Button,
  Row,
  Modal,
  Col
} from 'components'

const PaymentSuccess = props => (
  <Modal
    show
    onHide={props.hideModal}
  >
    <Modal.Header closeButton>
      <Modal.Title>Payment Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row className='text-center'>
        <Col lg={12}>
          <br />
          <h2 className={classes.successHeader}>
            Success
          </h2>
          <i className='fa fa-check fa-5x text-success'></i>
          <p className={classes.successMessage}>
            Your payment has been securely processed and you're ready to start protecting your privacy online!
          </p>
          <Button onClick={props.handleClick} block bsStyle='success' className='m-t-2 m-b-2'>
            Continue
          </Button>
        </Col>
      </Row>
    </Modal.Body>
    <Modal.Footer>
      <p className="text-center text-gray-dark">
        <strong>InfoSweep </strong>
        <span className={classes.footerAddress}>
          6312 S. Fiddlers Green Cir 550N Greenwood Village, CO 80111 USA. (844) 641-7829
        </span>
      </p>
    </Modal.Footer>
  </Modal>
)

export default PaymentSuccess
