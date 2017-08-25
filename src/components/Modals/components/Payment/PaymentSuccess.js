import React from 'react';
import classes from './paymentModal.scss';
import {
  Button,
  Row,
  Col
} from 'components';

const PaymentSuccess = props => (
    <Row className='text-center'>
      <Col lg={ 12 }>
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
)

export default PaymentSuccess
