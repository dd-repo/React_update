import React from 'react';
import {
  OverlayTrigger,
  Button,
  Label,
  Tooltip
} from 'components'
import { formatDate, formatPrice, formatCreditCard } from 'utils';

const TRANSACTION_STATUS = {
  'completed': <i className='fa fa-check text-success'></i>,
    'refunded': <i className='fa fa-refresh text-warning'></i>,
      'declined': <i className='fa fa-close text-danger'></i>
}

const Transaction = ({ transaction, handleReceiptClick }) => {
  const _handleReceiptClick = () => { handleReceiptClick(transaction) }

  return (
    <tr>
      <td>
        <OverlayTrigger
          overlay={
            <Tooltip id='payment-status-tooltip-1'>
              { transaction.status }
            </Tooltip>
            }
          >
            { TRANSACTION_STATUS[transaction.status] }
          </OverlayTrigger>
        </td>
        <td className='text-white'>
          { transaction.id }
        </td>
        <td className='text-white'>
          { formatDate(transaction.processed_at) }
        </td>
        <td className='text-white'>
          { formatPrice(transaction.amount) }
        </td>
        <td>
          <Label outline bsStyle='primary'>
            Individual
          </Label>
        </td>
        <td>
          <i className='fa fa-fw fa-credit-card-alt text-primary m-r-1'></i>
          <span className='text-white'>
            { formatCreditCard(transaction.card) }
          </span>
        </td>
        <td>
          <OverlayTrigger
            overlay={
              <Tooltip id='transaction-receipt-tooltip'>
                View
              </Tooltip>
            }
          >
            <Button bsStyle='link' onClick={_handleReceiptClick}>
              <i className='fa fa-cloud-download'></i>
            </Button>
          </OverlayTrigger>
        </td>
        </tr>
  )
}

export default Transaction;
