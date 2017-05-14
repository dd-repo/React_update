import React, { PropTypes } from 'react';

import { formatDate } from 'utils/dateHelper';

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
        { sales_rep_name }
      </td>
    </tr>
  )
}

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired
}

export default Transaction;
