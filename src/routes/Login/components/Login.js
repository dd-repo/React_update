import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import LoginForm from './LoginForm';
import logo from 'static/logos/logo-small-navbar.png';
import classes from './Login.scss';
import {
    Row,
    Col,
    Panel,
    Button,
    Form,
    FormGroup,
    FormControl,
    Checkbox
} from 'components';

const Login = ({ errorMessage, submitForm }) => {
  return (
    <Row>
      <Col lg={ 12 }>
        { /* <Button className='m-t-2 m-b-1' onClick={ () => this.props.history.goBack() }>
          <i className='fa fa-angle-left m-r-1'></i>
          Back
          </Button> */ }

        <Row>
          <Col className={ classes.centerCol } md={ 4 }>
            <Panel
              header={(
                <Link to='/' className={ classes.toHomeLink }>
                  <img src={ logo } alt='Back to Home' />
                </Link>
                )}
                footer={(
                  <div>
                    <Link to='/forgot-password'>
                      Forgot Password?
                    </Link>
                    <Link to='/' className='pull-right'>
                      Signup
                    </Link>
                  </div>
                  )}
                >
                  <h2 className={ classes.panelHeader }>
                    Login
                  </h2>
                  <p className='text-center m-b-3'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                  </p>

                  <LoginForm
                    submitForm={submitForm}
                    errorMessage={errorMessage}
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

Login.propTypes = {
  submitForm: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

export default Login;
