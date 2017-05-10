import React from 'react';
import { Link } from 'react-router';

import {
    Row,
    Col,
    Panel,
    Button,
    Form,
    FormGroup,
    FormControl,
} from 'components';

import classes from './forgotPassword.scss';

import logo from 'static/logos/logo-small.png';

const styles = {
  link: {
    textDecoration: 'none',
    color: 'white'
  }
}

const ForgotPasswordComplete = ({ userEmail }) => {
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
                >
                  <h2 className={ classes.panelHeader }>
                  </h2>
                  <p className='text-center m-b-3'>
                   An email to { userEmail } from Blitz Monitoring has been sent. Please follow the instructions in the email to reset your password.
                  </p>

                </Panel>
                <p className='text-center text-gray-light'>
                  <strong>Blitz Monitoring </strong>
                  <span className='text-gray-light'>
                    © 2009 - 2017. Made by <i className="fa fa-fw fa-ship text-primary"></i> Denver, US

                  </span>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
  );
}

export default ForgotPasswordComplete;

