import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import SignupForm from './SignupForm';
import logo from 'static/logos/logo-small.png';
import classes from './signup.scss';
import {
    Row,
    Col,
    Panel,
    Alert
} from 'components';

const Signup = ({ errorMessage, submitForm }) => {

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
              header={(
                <Link to='/' className={ classes.toHomeLink }>
                  <img src={ logo } alt='Back to Home' />
                </Link>
                )}
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
                  />

                </Panel>
                <p className='text-center text-gray-light'>
                  <strong>Blitz Monitoring </strong>
                  <span className='text-gray-light'>
                    © 2009 - 2017. Made by <i className="fa fa-fw fa-flash text-primary"></i> Denver, CO
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
