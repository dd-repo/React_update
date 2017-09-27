import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import SignupForm from './SignupForm';
import RootModal from 'components/Modals';
import logo from 'static/logos/logo-white-sm.png';
import classes from './signup.scss';
import {
    Row,
    Col,
    Panel,
    Alert,
    Modal,
    Button,
} from 'components';

const Signup = props => {
  const {
    errorMessage,
    passwordErrorMsg,
    passwordSuccessMsg,
    submitForm,
    disableButton,
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
      <Col lg={ 12 }>
        {renderErrorMessage}
        <Row>
          <Col className={ classes.centerCol } md={ 4 }>
            <Panel
              className={ classes.registerPanel }
              footer={(
                <div>
                  <Link to='/login'>
                    Login
                  </Link>
                  <Link to='/login' className='pull-right'>
                  </Link>
                </div>
                )}
              >
                <h2 className={ classes.panelHeader }>
                  Signup
                </h2>
                <p className='text-center m-b-3'>
                  Please enter the name and email address that you'd like to protect. Don't worry, you'll be able to protect additional information after signing up, and of course, we never share this information with anyone.
                </p>

                <SignupForm
                  submitForm={submitForm}
                  passwordErrorMsg={passwordErrorMsg}
                  passwordSuccessMsg={passwordSuccessMsg}
                  disableButton={disableButton}
                  showModal={showModal}
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
  submitForm: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

export default Signup;
