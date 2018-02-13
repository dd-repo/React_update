import React, { PropTypes } from 'react';

import { formatDate, formatPrice } from 'utils';
import { DropdownButton, MenuItem, Label } from 'components';

const STYLE = {
  'completed': 'success',
  'refunded':  'warning',
  'declined':  'danger'
}

const BUTTON_LABEL = {
  'completed': 'Refund',
  'declined':  'Charge'
}

const MODAL_ACTION = {
  'receipt': 'CONFIRM_SEND_RECEIPT',
  'Refund': 'TRANSACTION'
}
const Transaction = (props) => {
  const {
    id,
    state,
    processed_at,
    type_of_deal,
    user_email,
    third_party_id,
    round,
    subscription_id,
    sales_rep_name,
    client_name,
    amount,
    status
  } = props.transaction

  const buttonLabel = BUTTON_LABEL[status] 

  const handleDropdownSelect = action => {
    const modalAction = MODAL_ACTION[action]
    props.showModal(modalAction, props.transaction)
  }

  const renderButton = (
    status !== 'refunded' &&
      <DropdownButton
        dropup
        onSelect={handleDropdownSelect}
        title='Actions'
        bsStyle="danger"
        id='dropdown-basic'
        bsSize='lg'
      >
        <MenuItem eventKey={buttonLabel}>{buttonLabel}</MenuItem>
        <MenuItem eventKey="receipt">Send Receipt</MenuItem>
      </DropdownButton>
  )

  const salesRep = (
    sales_rep_name !== " " ? sales_rep_name : 'Web'
  )

  return (
  <tbody key={id}>
    <tr className='bg-gray-darker'>
      <td>
        { id }
      </td>
      <td>
          { client_name }
      </td>
      <td>
        { user_email }
      </td>
      <td>
        { third_party_id }
      </td>
      <td>
        { formatDate(processed_at) }
      </td>
      <td>
        { round }
      </td>
      <td>
        { subscription_id }
      </td>
      <td>
        { type_of_deal }
      </td>
      <td>
        { salesRep }
      </td>
      <td>
        <Label
          outline
          className='text-uppercase'
          bsStyle={STYLE[status]}>
        { status }
        </Label>
      </td>
      <td>
        { formatPrice(amount) }
      </td>
      <td>
        { renderButton }
      </td>
    </tr>
  </tbody>
  )
}

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired,
  handleCancelTransaction: PropTypes.func,
  confirmCancelTransaction: PropTypes.func,
  showModal: PropTypes.func,
  transactionInProgress: PropTypes.object,
  hideModal: PropTypes.func,
  paginationItems: PropTypes.number,
  pageNum: PropTypes.number,
  isFetching: PropTypes.bool,
  getNextPage: PropTypes.func,
  handleSearch: PropTypes.func,
  qureyName: PropTypes.string,
  limit: PropTypes.number,
  total: PropTypes.number
}

export default Transaction;
