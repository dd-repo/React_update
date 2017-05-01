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

import classes from './payment.scss';

import logo from 'static/logos/logo-small.png';

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
                     Your payment has been securely processed and you're ready to start protecting your privacy online!
                  </h2>
                  <p className='text-center m-b-3'>
                  </p>

                  <Button block bsStyle='primary' className='m-b-2'>
                    <Link style={styles.link} to='/keywords'>Continue</Link>
                    </Button>
                </Panel>
                <p className='text-center text-gray-light'>
                  <strong>Blitz Monitoring</strong>
                  <span className='text-gray-light'>
                    © 2009 - 2017. Made by <i className="fa fa-fw fa-flash text-primary"></i> Denver, US
                  </span>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
  );
}

export default PaymentComplete;
