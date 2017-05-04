import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import SignupForm from './SignupForm';
import logo from 'static/logos/logo-small.png';
import classes from './signup.scss';
import {
    Row,
    Col,
    Panel,
    Alert,
    Modal,
    Button,
} from 'components';

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {showModal: false}


    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal})
  }

  render() {
    const { errorMessage, submitForm } = this.props
    const renderErrorMessage = (
      errorMessage &&
        <Alert bsStyle='danger'>
          <i className="fa fa-fw text-danger m-r-1"></i>
          {errorMessage}
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
                  footer={(
                    <div>
                      <Link to='/login'>
                        Login
                      </Link>
                      <Link to='/login' className='pull-right'>
                      </Link>
                    </div>
                    )}
                  >
                    <h2 className={ classes.panelHeader }>
                      Signup
                    </h2>
                    <p className='text-center m-b-3'>
                      Please enter the name and email address that you'd like to protect. Don't worry, you'll be able to protect additional information after signing up, and of course, we never share this information with anyone.
                    </p>

                    <SignupForm
                      submitForm={submitForm}
                      toggleModal={this.toggleModal}
                    />

                </Panel>
              </Col>
            </Row>

            <Modal
              bsSize='large'
              show={ this.state.showModal }
              onHide={ this.toggleModal }
            >
              <Modal.Header>
                <Modal.Title>Our Terms Of Service</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  You must have Internet access and a current valid accepted payment method as indicated during sign-up ("Payment Method"), to use our service. We will begin billing your Payment Method for monthly membership fees upon enrollment. Your Payment Method will be authorized for up to approximately one month of service as soon as you register. TO CANCEL SEND AN EMAIL WITH YOUR ACCOUNT USERNAME AND PASSWORD TO HELP@INTERNETREPUTATION.COM. We will continue to bill your Payment Method on a monthly basis for your membership fee until you cancel. You may cancel your membership at any time; however, there are no refunds or credits for partially used periods.
                </p>
                <p>
                  Billing - By starting your InternetReputation.com membership, you are expressly agreeing that we are authorized to charge your payment method with a monthly membership fee at the then current rate, and any other charges you may incur in connection with your use of the service to the Payment Method you provided during registration (or to a different Payment Method if you change your account information). Please note that prices and charges are subject to change with notice. As used in these Terms of Use, "billing" shall indicate either a charge or debit, as applicable, against your Payment Method. The membership fee will be billed at the beginning of your membership and each month thereafter unless and until you cancel your membership. We automatically bill your Payment Method each 30 days. By signing up for this service, you agree that membership charges are fully earned upon payment. For certain Payment Methods, the issuer of your Payment Method may charge you a foreign transaction fee or related charges. Check with your bank and credit card issuers for details. PAYMENTS ARE NONREFUNDABLE AND NO REFUNDS OR CREDITS FOR PARTIALLY USED PERIODS WILL BE ISSUED. We may change the fees and charges in effect, or add new fees and charges from time to time, but we will give you advance notice of these changes by email.
                </p>
                <p>
                  Ongoing Membership - Our membership, will continue month-to-month unless and until you cancel your membership or we terminate it. You must cancel your membership before it renews each month in order to avoid billing of the next month's membership fees to your Payment Method. We will bill the monthly membership fee to the Payment Method you provide to us during registration (or to a different Payment Method if you change your account information). Membership fees are fully earned upon payment.
                </p>
                <p>
                  Cancellation -You may cancel your membership at any time. WE DO NOT PROVIDE REFUNDS OR CREDITS FOR ANY PARTIAL-MONTH MEMBERSHIP PERIODS. To cancel, send an email to help@internetreputation.com with your account name and password.
                </p>
                <p className='text-primary'>
                  If you have any questions or concerns regarding these terms or regarding the service, please contact our customer service team at (844) 641-7829
                </p>

                <Modal.Footer>
                  <Button bsStyle='primary' onClick={this.toggleModal}>Close</Button>
                </Modal.Footer>

              </Modal.Body>
            </Modal>

          </Col>
        </Row>
    )
  }
}

Signup.propTypes = {
  submitForm: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}
