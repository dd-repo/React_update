import React, { Component } from 'react';

import { Button } from 'components';

export default class Subscription extends Component {
  constructor(props) {
    super(props)
    this._onClick = this._onClick.bind(this)
  }

  _onClick() {
    this.props.handleClick(this.props.subscription.id, !this.props.subscription.is_active)
  }

  render() {
    const {
      client_name,
      user_id,
      id,
      start_date,
      end_date,
      cancel_date,
      is_active,
      plan_id,
      plan_description,
      sales_rep_name,
    } = this.props.subscription

    const buttonLabel = is_active ? 'Cancel Subscription' : 'Canceled'
    const style = is_active ? 'danger' : 'success'
    const isActive = is_active ? 'true' : 'false'

    return (
      <tr className='bg-gray-darker' key={id}>
        <td>
          { id }
        </td>
        <td>
          { client_name }
        </td>
        <td>
          { user_id }
        </td>
        <td>
          { start_date }
        </td>
        <td>
          { end_date }
        </td>
        <td>
          { cancel_date }
        </td>
        <td>
          { isActive }
        </td>
        <td>
          { plan_id }
        </td>
        <td>
          { plan_description }
        </td>
        <td>
          { sales_rep_name }
        </td>
        <td>
          <Button
            bsStyle={style}
            disabled={!is_active}
            onClick={this._onClick}
          >
            { buttonLabel }
          </Button>
        </td>
      </tr>
    )
  }
}
