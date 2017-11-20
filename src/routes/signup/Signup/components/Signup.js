import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import SignupForm from './SignupForm'
import RootModal from 'components/Modals'
import classes from './signup.scss'
import {
  Row,
  Col,
  Panel,
  Alert
} from 'components'

const Signup = props => {
  const {
    errorMessage,
    passwordErrorMsg,
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
        <Row>
          <Col className={classes.centerCol} md={4}>
            <Panel
              className={classes.registerPanel}
              footer={(
                <div>
                  <Link to='/login'>
                    Login
                  </Link>
                  <Link to='/login' className='pull-right' />
                </div>
              )}
            >
              <h2 className={classes.panelHeader}>
                Signup
              </h2>
              <p className='text-center m-b-3'>
                Please enter the name and email address that you'd like to protect.
                Don't worry, you'll be able to protect additional information after
                signing up, and of course, we never share this information with anyone.
              </p>

              <SignupForm
                submitForm={submitForm}
                passwordErrorMsg={passwordErrorMsg}
                showModal={showModal}
                scrollTop={scrollTop}
              />

            </Panel>
          </Col>
        </Row>
      </Col>
      <RootModal />
    </Row>
  )
}

Signup.propTypes = {
  passwordErrorMsg: PropTypes.string,
  showModal: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  scrollTop: PropTypes.func
}

export default Signup
