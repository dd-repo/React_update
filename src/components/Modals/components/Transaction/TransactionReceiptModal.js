import React from 'react'
import ReactDOM from 'react-dom'
import fileSaver from 'file-saver'
import _ from 'underscore';
import classes from './transaction.scss'
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
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
  )
}

export default Receipt
