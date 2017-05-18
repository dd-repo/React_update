import React from 'react';
import { Link } from 'react-router';

import ForgotPasswordForm from './ForgotPasswordForm';
import {
    Row,
    Col,
    Panel,
    Button,
    Form,
    FormGroup,
    FormControl,
} from 'components';

import { CONTENT_VIEW_FLUID } from 'layouts/DefaultLayout/modules/layout';
import classes from './forgotPassword.scss';
import logo from 'static/logos/logo-small.png';

const ForgotPassword = ({ submitForm }) => {
  return (
    <Row>
      <Col lg={ 12 }>
        <Row>
          <Col className={ classes.centerCol } md={ 4 }>
            <Panel
              header={(
                <Link to='/login' className={ classes.toHomeLink }>
                  <img src={ logo } alt='Back to Home' />
                </Link>
                )}
                footer={(
                  <div>
                    <Link to='/login'>
                      Login
                    </Link>
                    <Link to='/signup' className='pull-right'>
                      Register
                    </Link>
                  </div>
                  )}
                >
                  <h2 className={ classes.panelHeader }>
                    Forgot Password
                  </h2>
                  <p className='text-center m-b-3'>
                    We can help you reset your password using your email address associated with your account.
                  </p>

                  <ForgotPasswordForm
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
  );
}

export default ForgotPassword;
