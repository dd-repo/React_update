import React, { PropTypes } from 'react';

import { formatDate } from 'utils/dateHelper';
import { Button } from 'components';

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
  } = props.transaction

  const renderCancelTransactionButton = (
    <Button
      bsStyle="danger"
      onClick={() => { props.confirmCancelTransaction(props.transaction) }}
    >
      Cancel Transaction
    </Button>
  )

  const salesRep = (
    sales_rep_name !== " " ? sales_rep_name : 'Web'
  )

  return (
    <tr className='bg-gray-darker' key={id}>
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
        { renderCancelTransactionButton }
      </td>
    </tr>
  )
}

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired,
  handleCancelTransaction: PropTypes.func,
  confirmCancelTransaction: PropTypes.func,
  showModal: PropTypes.bool,
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
