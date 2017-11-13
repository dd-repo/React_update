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
          planPrice={props.planPrice}
        />
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
}

export default PaymentModal;

