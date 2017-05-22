import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import ClientRegistrationForm from './ClientRegistrationForm';
import logo from 'static/logos/logo-small.png';
import classes from './clientRegistration.scss';
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
                <Link to='#' className={ classes.toHomeLink }>
                  <h2 className={ classes.panelHeader }>
                    Client Registration
                  </h2>
                </Link>
                )}
                >

                  <ClientRegistrationForm
                    submitForm={submitForm}
                    isFetching={isFetching}
                  />

                </Panel>
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


