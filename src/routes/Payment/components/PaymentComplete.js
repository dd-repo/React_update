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

//import { RoutedComponent, connect } from 'routes/routedComponent';
//import { CONTENT_VIEW_FLUID } from 'layouts/DefaultLayout/modules/layout';

import classes from './payment.scss';

import logo from 'static/spin-logo-inverted.png';

const styles = {
  link: {
    textDecoration: 'none',
    color: 'white'
  }
}

const PaymentComplete = (props) => {
  return (
    <Row>
      <Col lg={ 12 }>
        <Button className='m-t-2 m-b-1' onClick={ () => this.props.history.goBack() }>
          <i className='fa fa-angle-left m-r-1'></i>
          Back
        </Button>

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
                    <Link to='/pages/login'>
                      Login
                    </Link>
                    <Link to='/pages/register' className='pull-right'>
                      Register
                    </Link>
                  </div>
                  )}
                >
                  <h2 className={ classes.panelHeader }>
                    Congratulations your payment was successful
                  </h2>
                  <p className='text-center m-b-3'>
                  </p>

                  <Button block bsStyle='primary' className='m-b-2'>
                    <Link style={styles.link} to='/keywords'>Continue</Link>
                    </Button>
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
  );
}

export default PaymentComplete;
