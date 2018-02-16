import React from 'react'
import ReactDOM from 'react-dom'
import fileSaver from 'file-saver'
import _ from 'underscore';
import classes from './transaction.scss'
import TermsOfService from 'routes/Pages/TermsOfService/TermsOfService';
import {
  infosweepName,
  infosweepPhoneNumber,
  infosweepEmail,
  infosweepAddress
} from 'consts/infosweepInfo'
import { formatDate, formatPrice } from 'utils';

import {
  Modal,
  Row,
  Col,
  Table,
  Panel,
  Button,
  DropdownButton,
  MenuItem
} from 'components';

const Receipt = (props) => {
  const {
    transaction,
    subscription,
    user,
    phone,
    address,
  } = props.initialValues

  const sendEmail = () => {
    props.onSubmit(transaction.id)
    props.hideModal()
  }

    return (
      <Modal  show={true} onHide={props.hideModal}>
        <Modal.Header closeButton>
          <p className="m-b-2">
            Below you have the options to print and also to write to the format.
          </p>
        </Modal.Header>
        <Modal.Body className='receipt'>
          <Row>
            <Col lg={ 12 }>
              <Panel className={ classes.panelWhite }>
                <Row>
                  <Col md={ 6 }>
                    <h4 className="text-gray-darker text-uppercase m-b-1">
                      <strong>{ infosweepName }</strong>
                    </h4>
                    <p className='m-b-0'>
                      { infosweepAddress }
                    </p>

                    <p className='m-b-0 m-t-2'>
                      <abbr title="Phone">Phone: </abbr>
                      <span>{ infosweepPhoneNumber }</span>
                    </p>
                    <p className='m-b-0'>
                      <abbr title="Email">Email: </abbr>
                      <span>{ infosweepEmail }</span>
                    </p>
                  </Col>
                  <Col md={ 6 } className='text-right'>
                    <h4 className="text-gray-darker m-b-1">
                      <strong>Receipt Info</strong>
                    </h4>
                    <a href='javascript: void(0)'>
                      #{ transaction.id }
                    </a>
                    <p className='m-b-0'>
                      { 'to: ' }
                      <strong className='text-gray-darker'>
                        { user.fullName }
                      </strong>
                    </p>

                    <p className='m-b-0 m-t-2'>
                      { address.address1 }
                      { address.city }
                      { address.state }
                      { address.zip }
                    </p>
                    <p className='m-b-0'>
                      <abbr title="Phone">Phone:</abbr>
                      <span> { phone.phone_number }</span>
                    </p>
                    <p className='m-b-0'>
                      <abbr title="Email">Email:</abbr>
                      <span> { user.email }</span>
                    </p>

                    <p className='m-b-0 m-t-2'>
                      <span>Date Receipt: </span>
                      <span>{ formatDate(transaction.processed_at) }</span>
                    </p>
                  </Col>
                </Row>
                <Table className={ `${classes.invoiceTable} m-t-3` }>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Description</th>
                      <th className='text-right'>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        { transaction.id }
                      </td>
                      <td>
                        { subscription.planDescription }
                      </td>
                      <td>
                        { formatPrice(transaction.amount) }
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Panel>
              <div className='m-t-1'>
                <Button onClick={sendEmail}>
                  <i className="fa fa-fw text-gray-lighter fa-envelope-o m-r-1"></i> Send via Email
                </Button>
                <div className={`${classes.smallPrint} m-t-3`}>
                  <p>
                    You must have Internet access and a current valid accepted payment method as indicated during sign-up ("Payment Method"), to use our service. We will begin billing your Payment Method for monthly membership fees upon enrollment. Your Payment Method will be authorized for up to approximately one month of service as soon as you register. TO CANCEL SEND AN EMAIL WITH YOUR ACCOUNT USERNAME AND PASSWORD TO HELP@INFOSWEEP.COM. We will continue to bill your Payment Method on a monthly basis for your membership fee until you cancel. You may cancel your membership at any time; however, there are no refunds or credits for partially used periods.
                  </p>
                  <h6>Billing</h6>
                  <p>
                    By starting your infosweep membership, you are expressly agreeing that we are authorized to charge your payment method with a monthly membership fee at the then current rate, and any other charges you may incur in connection with your use of the service to the Payment Method you provided during registration (or to a different Payment Method if you change your account information). Please note that prices and charges are subject to change with notice. As used in these Terms of Use, "billing" shall indicate either a charge or debit, as applicable, against your Payment Method. The membership fee will be billed at the beginning of your membership and each month thereafter unless and until you cancel your membership. We automatically bill your Payment Method each 30 days. By signing up for this service, you agree that membership charges are fully earned upon payment. For certain Payment Methods, the issuer of your Payment Method may charge you a foreign transaction fee or related charges. Check with your bank and credit card issuers for details. PAYMENTS ARE NONREFUNDABLE AND NO REFUNDS OR CREDITS FOR PARTIALLY USED PERIODS WILL BE ISSUED. We may change the fees and charges in effect, or add new fees and charges from time to time, but we will give you advance notice of these changes by email.
                  </p>
                  <h6>Ongoing Membership</h6>
                  <p>
                    Our membership, will continue month-to-month unless and until you cancel your membership or we terminate it. You must cancel your membership before it renews each month in order to avoid billing of the next month's membership fees to your Payment Method. We will bill the monthly membership fee to the Payment Method you provide to us during registration (or to a different Payment Method if you change your account information). Membership fees are fully earned upon payment.
                  </p>
                  <h6>Cancellation</h6>
                  <p>
                    You may cancel your membership at any time. WE DO NOT PROVIDE REFUNDS OR CREDITS FOR ANY PARTIAL-MONTH MEMBERSHIP PERIODS. To cancel, send an email to help@infosweep.com with your account name and password.
                  </p>
                  <p className='text-primary'>
                    If you have any questions or concerns regarding these terms or regarding the service, please contact our customer service team at (844) 641-7829
                  </p>
              </div>   </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
  )
}

export default Receipt
