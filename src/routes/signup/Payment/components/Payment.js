import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import classes from './payment.scss'
import SignupProgress from '../../components/SignupProgress'
import trialImg from 'static/freeTrialRed.png'
import bbb from 'static/bbb.png'
import { PaymentForm } from 'components/Forms'

import {
    Row,
    Col,
    Panel,
    Button,
    Alert
} from 'components'

const Payment = (props) => {
  const { errorMessage } = props

  const renderErrorMessage = (
   errorMessage &&
  <Alert bsStyle='danger'>
    <i className="fa fa-fw text-danger m-r-1"></i>
    <strong>Transaction Failed:</strong> {errorMessage} - If you need help, please call us at (844) 641-7829
  </Alert>
  )

  return (
    <Row>
      <Col lg={12}>
        {renderErrorMessage}
        <Col className={classes.centerCol} md={8}>
          <Panel
            className={classes.registrationPanel}
            header={(
                <SignupProgress currentStep={2} />
            )}
          >
            <Row>
              <Col md={8}>
                <Row>
                  <Col md={10}>
                    <PaymentForm
                      submitForm={props.submitForm}
                      errorMessage={props.errorMessage}
                      isFetching={props.isFetching}
                      planPrice={props.planPrice}
                      buttonLabel={'Start your free trial'}
                    />
                  </Col>
                </Row>
              </Col>
              <Col className={classes.membershipSection} md={4}>
                <div className={classes.topPortion}>

                  <h5>Your Membership:</h5>
                  <p>Free Monitoring Trial
                    <br/>
                    <span>$19 per month, after your free trial</span>
                  </p>
                  <img src={trialImg} />
                  <div className={classes.contact}>
                    <p>You can also contact us by phone:</p>
                    <p className={classes.number}>877-804-7293 </p>
                  </div>
                  <div className={classes.description}>
                    <p>At InfoSweep, we believe that you should be in control of your online privacy. Because we believe that you should hold the power over your information, we'll never lock you into a contract or charge any cancellation fees.  Your subscription will automatically renew every one month as long as you like, and you can cancel at any time</p>
                  </div>

                  <div className="last_footer">
                    <p>We take your privacy seriously. For more information read our <a onClick={() => props.showModal('PRIVACY_POLICY')}>Privacy Policy.</a></p>
                    <img style={{height: '40px'}} className={classes.bbbImg} src={bbb} />
                  </div>
                </div>
              </Col>
            </Row>
          </Panel>
        </Col>
      </Col>
    </Row>
  )
}

Payment.propTypes = {
  submitForm: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

export default Payment
