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
    Alert
} from 'components';

const Payment = (props) => {

  const { errorMessage } = props

  const renderErrorMessage = (
   errorMessage &&
  <Alert bsStyle='danger'>
    <i className="fa fa-fw text-danger m-r-1"></i>
    <strong>Transaction Failed:</strong> {errorMessage} - If you need help, please call us at (844) 641-7829
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
                  >
                    <h2 className={ classes.panelHeader }>
                      Payment Information
                    </h2>
                    <p className='text-center m-b-3'>
                       Your card will be billed monthly until you choose to end the subscription. You can cancel any time without fees or penalties.
                    </p>

                    <PaymentForm
                      {...props}
                    />

                </Panel>
                { /* <p className='text-center text-gray-light'>
                  <strong>Blitz Monitoring</strong>
                  <span className='text-gray-light'>
                    © 2009 - 2017. Made by <i className="fa fa-fw fa-flash text-primary"></i> Denver, US
                  </span>
                  </p> */ }
              </Col>
            </Row>
          </Col>
        </Row>
    )
}

Payment.propTypes = {
  submitForm: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

export default Payment;
