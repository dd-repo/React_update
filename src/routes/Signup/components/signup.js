import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import SignupForm from './SignupForm';
import logo from 'static/logos/logo-small.png';
import classes from './signup.scss';
import {
    Row,
    Col,
    Panel,
    Button,
    Alert
} from 'components';

const Signup = ({ errorMessage, submitForm, plan }) => {
  const renderErrorMessage = (
   errorMessage &&
  <Alert bsStyle='danger'>
    <i className="fa fa-fw text-danger m-r-1"></i>
    <strong>Oh Snap!</strong> {errorMessage}
  </Alert>
  )
  return (
    <Row>
      <Col lg={ 12 }>
        { /* <Button className='m-t-2 m-b-1' onClick={ () => this.props.history.goBack() }>
          <i className='fa fa-angle-left m-r-1'></i>
          Back
          </Button> */ }
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
                    <Link to='/forgot-password'>
                      Forgot Password?
                    </Link>
                    <Link to='/login' className='pull-right'>
                      Login
                    </Link>
                  </div>
                  )}
                >
                  <h2 className={ classes.panelHeader }>
                    Signup
                  </h2>
                  <p className='text-center m-b-3'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                  </p>

                  <SignupForm
                    submitForm={submitForm}
                    price={plan.price}
                    planType={plan.type}
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

Signup.propTypes = {
  submitForm: PropTypes.func.isRequired,
  plan: PropTypes.object.isRequired,
  errorMessage: PropTypes.string
}

export default Signup;

