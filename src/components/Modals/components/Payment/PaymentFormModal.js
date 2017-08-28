import React from 'react';
import { Modal } from 'components';
import { PaymentForm } from 'components/Forms';
import classes from './paymentModal.scss';
import { branch } from 'recompose';
import Loading from 'react-loading';

const PaymentModal = props => {

  const renderLoader = (
    props.isFetching &&
      <div className='container'>
        <div className={classes.spinner}>
          <div className="col-md-12">
            <Loading type='spinningBubbles' color='white' />
          </div>
        </div>
      </div>
  )

  return (
    <Modal
      show={true}
      onHide={props.hideModal}
    >
      { renderLoader }
      <Modal.Header closeButton>
        <Modal.Title>Payment Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PaymentForm
          submitForm={props.submitForm}
          errorMessage={props.errorMessage}
          paymentSuccess={props.paymentSuccess}
          isFetching={props.isFetching}
          planType={props.planType}
          planPrice={props.planPrice}
        />
      </Modal.Body>
    </Modal>
  )
}

export default PaymentModal;

