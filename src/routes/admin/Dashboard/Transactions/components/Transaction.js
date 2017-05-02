import React, { Component } from 'react';

export default class Transaction extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      id,
      state,
      processed_at,
      type_of_deal,
      round,
      subscription_id,
      sales_rep_name,
      client_name,
    } = this.props.transaction

    return (
      <tr className='bg-gray-darker' key={id}>
        <td>
          { client_name }
        </td>
        <td>
          email
        </td>
        <td>
          { id }
        </td>
        <td>
          { processed_at }
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
}
