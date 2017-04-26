import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import ClientSignupForm from './ClientSignupForm';
import logo from 'static/logos/logo-small.png';
import classes from './clientSignup.scss';
import {
    Row,
    Col,
    Panel,
    Button,
    Alert
} from 'components';

const Signup = ({ notification, submitForm, resetForm, isFetching }) => {

  const renderMessage = notification &&
    <Alert bsStyle={notification.status}>
      { notification.message }
    </Alert>

  return (
    <Row>
      <Col lg={ 12 }>
          {renderMessage}
        <Row>
          <Col className={ classes.centerCol } lg={ 9 }>
            <Panel
              className={ classes.registerPanel }
              header={(
                <Link to='/' className={ classes.toHomeLink }>
                  <img src={ logo } alt='Back to Home' />
                </Link>
                )}
                >
                  <h2 className={ classes.panelHeader }>
                    Client Signup
                  </h2>

                  <ClientSignupForm
                    submitForm={submitForm}
                    isFetching={isFetching}
                  />

                </Panel>
                <p className='text-center text-gray-light'>
                  <strong>Blitz Monitoring </strong>
                  <span className='text-gray-light'>
                    © 2017. Made by <i className="fa fa-fw fa-heart text-danger"></i> Denver, CO
                  </span>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
  )
}

Signup.propTypes = {
  submitForm: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

export default Signup;


