import React from 'react';
import _ from 'underscore';
import { Link } from 'react-router';
import { formatPrice, formatDate, formatCreditCard } from 'utils';

import {
    Panel,
    Form,
    FormGroup,
    Col,
    FormControl,
    ControlLabel,
    Radio,
    Button,
    ProgressBar,
    Media,
    Table,
    OverlayTrigger,
    Tooltip,
    Modal,
    Row,
    Divider,
    Label,
    SlimProgressBar
} from 'components';

import PricingTables from 'routes/signup/Pricing/PricingTables';

import { Colors } from 'consts';

import classes from '../../account.scss';

class BillingEdit extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            planModalOpen: false,
            paymentModalOpen: false,
            paymentModalType: 'credit'
        }
    }
    render() {
      const {
        subscription:
          {
            card,
            plan,
            planDescription,
            planPrice,
            nextPayment,
            cancelDate,
            isActive,
            startDate
          },
          handleCancelSubscription } = this.props

      const price = formatPrice(planPrice)

        return (
            <div>
                <Panel
                    className='m-b-2'
                    header={
                        <h4 className='panel-title'>
                            Billing Edit
                        </h4>
                    }
                    footer={
                      <div className={isActive ? 'text-right' : 'text-center'}>
                        {
                          isActive &&
                            <Button onClick={handleCancelSubscription} className='text-danger' bsSize='sm' bsStyle='link'>
                              Cancel Subscription
                            </Button>
                            }
                            {
                              !isActive &&
                                <p>
                                  Your subscription canceled on {formatDate(cancelDate)}.
                                  Your account is active until {formatDate(nextPayment)}
                                </p>
                            }
                          </div>
                          }
                >
                    <Form horizontal>
                        <Media>
                            <Media.Body>
                                <FormGroup>
                                    <Col componentClass={ControlLabel} sm={3}>
                                        Your Plan
                                    </Col>
                                    <Col sm={6}>
                                        <p>
                                          <span>
                                            <Label bsStyle='primary' outline>
                                              {plan || ''}
                                          </Label>
                                        </span> - Protects one individual
                                        </p>

                                        <SlimProgressBar>
                                            <ProgressBar now={ 50 } key={ 1 }/>
                                            <ProgressBar now={ 30 } bsStyle='info' key={ 2 } />
                                            <ProgressBar now={ 20 } bsStyle='success' key={ 3 } />
                                        </SlimProgressBar>

                                        <dl className={`${classes.horizontal} m-t-1`}>
                                          <dt>
                                            Price
                                          </dt>
                                          <dd>
                                            { price } / Month
                                          </dd>
                                        </dl>
                                    </Col>
                                </FormGroup>
                            </Media.Body>
                            { /* <Media.Right>
                                <Button onClick={ () => { this.setState({ planModalOpen: true }) } }>
                                    Change Plan
                                </Button>
                                </Media.Right> */}
                        </Media>

                        <Divider>
                            Payment
                        </Divider>

                        <Media>
                            <Media.Body>
                                <FormGroup>
                                    <Col componentClass={ControlLabel} sm={3}>
                                        Payment Method
                                    </Col>
                                    <Col sm={9}>
                                        <p className='m-b-1'>
                                            <i className="fa fa-fw fa-credit-card-alt text-primary m-r-1 m-y-1"></i>
                                            <span>Credit Card</span> - { formatCreditCard(card) }
                                        </p>
                                        <dl className="dl-horizontal">
                                            <dt>Next Payment Due</dt>
                                            <dd> { formatDate(nextPayment) } </dd>

                                            <dt>Amount</dt>
                                            <dd>{ price }</dd>
                                        </dl>
                                    </Col>
                                </FormGroup>
                            </Media.Body>
                            <Media.Right>
                              { /*
                                   <Button onClick={ () => { this.setState({ paymentModalOpen: true }) } }>
                                    Change Payment
                                    </Button>
                                    */ }
                            </Media.Right>
                        </Media>
                    </Form>
                </Panel>

                <Modal
                    show={ this.state.planModalOpen }
                    onHide={ () => this.setState({ planModalOpen: false }) }
                    bsSize='large'
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Change Your Plan</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Row>
                          <PricingTables />
                      </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <p className='m-y-0'>
                            <Label outline className='m-r-1'>
                                Free
                            </Label>
                            Lorem ipsum dolor sit amet, consectetur adipisicing <a href='javascript:;'>Downgrade Now</a>
                        </p>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={ this.state.paymentModalOpen }
                    onHide={ () => this.setState({ paymentModalOpen: false }) }
                    bsSize='small'
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Payment Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <h5 className={ classes.paymentOtherLabel }>
                                    Pay With
                                </h5>
                                <Radio
                                    inline
                                    checked={ this.state.paymentModalType === 'credit' }
                                    onChange={ () => { this.setState({ paymentModalType: 'credit' }) } }
                                >
                                    Credit Card
                                </Radio>
                                <Radio
                                    inline
                                    checked={ this.state.paymentModalType === 'paypal' }
                                    onChange={ () => { this.setState({ paymentModalType: 'paypal' }) } }
                                >
                                    PayPal Account
                                </Radio>
                            </FormGroup>
                            {
                                this.state.paymentModalType === 'credit' ? (
                                    <div>
                                        <FormGroup>
                                            <h5 className={ classes.paymentOtherLabel }>
                                                Credit Card Number
                                            </h5>
                                            <FormControl type='text' placeholder='Enter Your Card Number...'/>
                                        </FormGroup>

                                        <FormGroup>
                                            <h5 className={ classes.paymentOtherLabel }>
                                                Accepted Cards
                                            </h5>

                                            <div>
                                                <i className="fa fa-fw fa-cc-visa fa-2x m-r-1 text-white"></i>
                                                <i className="fa fa-fw fa-cc-mastercard fa-2x m-r-1 text-white"></i>
                                                <i className="fa fa-fw fa-cc-discover fa-2x m-r-1 text-white"></i>
                                                <i className="fa fa-fw fa-cc-amex fa-2x m-r-1 text-white"></i>
                                                <i className="fa fa-fw fa-cc-jcb fa-2x m-r-1 text-white"></i>
                                            </div>
                                        </FormGroup>

                                        <Row>
                                            <Col xs={ 7 }>
                                                <FormGroup inline>
                                                    <h5 className={ classes.paymentOtherLabel }>
                                                        Expiriation
                                                    </h5>

                                                    <div className={ classes.inlineInputs }>
                                                        <FormControl componentClass="select" inline>
                                                            {
                                                                _.map(Array.from((function*(){
                                                                        for(let i = 1; i <= 12; i++)
                                                                            yield i;
                                                                    })()), (month, i) => (
                                                                        <option value={ month } key={ i }>{ month }</option>
                                                                    ))
                                                            }
                                                        </FormControl>
                                                        <FormControl componentClass="select" inline>
                                                            {
                                                                _.map(Array.from((function*(){
                                                                        for(let i = 0; i < 10; i++)
                                                                            yield 16 + i;
                                                                    })()), (year, i) => (
                                                                        <option value={ year } key={ i }>{ year }</option>
                                                                    ))
                                                            }
                                                        </FormControl>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs={ 5 }>
                                                <FormGroup>
                                                    <h5 className={ classes.paymentOtherLabel }>
                                                        CVV
                                                    </h5>
                                                    <FormControl type='text' placeholder='CVV Code...'/>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <FormGroup>
                                            <ControlLabel>Country</ControlLabel>
                                            <FormControl componentClass="select">
                                                <option value={ 1 }>United Kingdom</option>
                                                <option value={ 2 }>United States</option>
                                                <option value={ 2 }>Australia</option>
                                                <option value={ 3 }>Canada</option>
                                                <option value={ 4 }>New Zeland</option>
                                                <option value={ 5 }>Germany</option>
                                            </FormControl>
                                        </FormGroup>

                                        <FormGroup>
                                            <ControlLabel>Postal Code</ControlLabel>
                                            <FormControl type='text' placeholder='Enter Code...'/>
                                        </FormGroup>

                                        <FormGroup>
                                            <ControlLabel>VAT ID</ControlLabel>
                                            <FormControl type='text' placeholder='Enter ID...'/>
                                        </FormGroup>
                                    </div>
                                ) : (
                                    <div>
                                        <h5 class="m-t-3">Charge to</h5>
                                        <p>
                                            You are currently paying with your PayPal account <strong class="text-white"><span>Alanna.Nicolas@gmail.com</span></strong> Sign in to PayPal to use a different account.
                                        </p>
                                        <Button block className='m-y-2' bsStyle='primary'>
                                            <i className='fa fa-fw fa-paypal'></i>
                                            { ' ' }
                                            PayPal
                                        </Button>
                                    </div>
                                )
                            }
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className='m-r-1'
                            onClick={ () => this.setState({ paymentModalOpen: false }) }
                        >
                            Cancel
                        </Button>
                        <Button bsStyle='success'>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default BillingEdit;
