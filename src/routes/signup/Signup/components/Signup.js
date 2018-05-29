import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import SignupForm from './SignupForm'
import RootModal from 'components/Modals'
import classes from './signup.scss'
import SignupProgress from '../../components/SignupProgress'
import trialImg from 'static/freeTrialRed.png'
import bbb from 'static/bbb.png'
import {
  Row,
  Col,
  Panel,
  Divider,
  Alert
} from 'components'

const Signup = props => {
  const {
    errorMessage,
    submitForm,
    scrollTop,
    showModal
  } = props

  const renderErrorMessage = (
    errorMessage &&
    <Alert bsStyle='danger'>
      <i className="fa fa-fw text-danger m-r-1"></i>
      {errorMessage}
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
                <SignupProgress currentStep={1} />
              )}
            >
              <Row>
                <Col md={8}>
                  <h2 className={classes.panelHeader}>
                    Create your account
                  </h2>
                  <p>
                    Already have an account?
                    <Link className='m-l-1' to='/login'>
                      Login
                    </Link>
                  </p>
                  <Divider />
                  <SignupForm
                    submitForm={submitForm}
                    scrollTop={scrollTop}
                    showModal={showModal}
                  />
                </Col>
                <Col className={classes.membershipSection} md={4}>
                  <div className={classes.topPortion}>

                    <h5>Your Membership:</h5>
                    <p>
                      $29 per month
                    </p>
                  </div>
                  <div className={classes.contact}>
                    <p>You can also contact us by phone:</p>
                    <p className={classes.number}>877-804-7293 </p>
                  </div>

                  <div className="last_footer">
                    <p>Your privacy is our top priority. For more information read our <a onClick={() => showModal('PRIVACY_POLICY')}>Privacy Policy.</a></p>
                    <img style={{height: '40px'}} className={classes.bbbImg} src={bbb} />
                  </div>
                </Col>
              </Row>
            </Panel>
          </Col>
      </Col>
      <RootModal />
    </Row>
  )
}

Signup.propTypes = {
  submitForm: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  scrollTop: PropTypes.func
}

export default Signup

