import React from 'react';
import { Link } from 'react-router';

import CreatePasswordForm from './CreatePasswordForm';
import {
    Row,
    Col,
    Panel,
    Button,
    Form,
    FormGroup,
    FormControl,
    Alert
} from 'components';

import classes from './CreatePassword.scss';
import logo from 'static/logos/logo-small.png';

const CreatePassword = ({ submitForm, passwordErrorMsg, errorMessage, disableButton }) => {

  const renderErrorMsg = errorMessage &&
    <Alert bsStyle='danger'>
      <i className='fa fa-fw text-danger m-r-1'></i>
      {errorMessage}
    </Alert>

  return (
    <Row>
      <Col lg={ 12 }>
        <Row>
          {renderErrorMsg}
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
                    Create Password
                  </h2>
                  <p className='text-center m-b-3'>
                  </p>

                  <CreatePasswordForm
                    submitForm={submitForm}
                    passwordErrorMsg={passwordErrorMsg}
                    disableButton={disableButton}
                  />

                </Panel>
                <p className='text-center text-gray-light'>
                  <strong>Blitz Monitoring </strong>
                  <span className='text-gray-light'>
                    © 2009 - 2017. Made by <i className="fa fa-fw fa-ship text-primary"></i> Denver, CO
                  </span>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
  );
}

export default CreatePassword;

