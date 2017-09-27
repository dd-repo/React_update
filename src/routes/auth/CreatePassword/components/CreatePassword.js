import React from 'react';
import { Link } from 'react-router';

import CreatePasswordForm from './CreatePasswordForm';
import {
    Row,
    Col,
    Panel,
    Form,
    FormGroup,
    FormControl,
    Alert
} from 'components';

import classes from './createPassword.scss';
import logo from 'static/logos/logo-white-sm.png';

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
                  <img src={ logo } height={ 50 } alt='Back to Home' />
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
                  <span className="text-gray-dark">
                    © 2017 <strong className="m-r-1">infosweep.</strong>
                    All rights reserved.
                  </span>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
  );
}

export default CreatePassword;

