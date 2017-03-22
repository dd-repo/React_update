import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import logo from 'static/logos/logo-small.png';
import PaymentForm from './PaymentForm';
import classes from './payment.scss';
//import ProgressIndicator from './ProgressIndicator';

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

const Payment = (props) => {
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
                className={ classes.registerPanel }
                header={(
                  <Link to='/' className={ classes.toHomeLink }>
                    <img src={ logo } alt='Back to Home' />
                  </Link>
                  )}
                  footer={(
                    <div>
                      <Link to='/pages/forgot-password'>
                        Forgot Password?
                      </Link>
                      <Link to='/pages/login' className='pull-right'>
                        Login
                      </Link>
                    </div>
                    )}
                  >
                    <h2 className={ classes.panelHeader }>
                      Payment Information
                    </h2>
                    <p className='text-center m-b-3'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </p>

                    <PaymentForm
                      {...props}
                    />

                </Panel>
                <p className='text-center text-gray-light'>
                  <strong>SPIN Dashboard </strong>
                  <span className='text-gray-light'>
                    © 2009 - 2016. Made by <i className="fa fa-fw fa-heart text-danger"></i> New York, US
                  </span>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
    )
}

Payment.propTypes = {
  submitForm: PropTypes.func.isRequired,
  planType: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  errorMessage: PropTypes.string
}

export default Payment;
