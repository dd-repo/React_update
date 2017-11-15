import React from 'react'
import { Modal } from 'components'
import { infosweepPhoneNumber, infosweepAddress } from 'consts/infosweepInfo'
import { PaymentForm } from 'components/Forms'
import classes from './paymentModal.scss'
import Loading from 'react-loading'

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
      show
      onHide={props.hideModal}
    >
      {renderLoader}
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
            {infosweepAddress} {infosweepPhoneNumber}
          </span>
        </p>
      </Modal.Footer>
    </Modal>
  )
}

export default PaymentModal

