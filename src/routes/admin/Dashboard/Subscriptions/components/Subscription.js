import React, { Component, PropTypes } from 'react';
import { Button } from 'components';

import { formatDate } from 'utils/dateHelper';

export default class Subscription extends Component {
  constructor(props) {
    super(props)
    this._onClick = this._onClick.bind(this)
  }

  _onClick() {
    this.props.confirmCancelation(this.props.subscription)
    //this.props.handleClick(this.props.subscription.id, !this.props.subscription.is_active)
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

    const isActive = is_active ? 'Active' : 'Canceled'

    const renderButton = (
      is_active ?
          <Button
            bsStyle='danger'
            onClick={this._onClick}
          >
            Cancel Subscription
          </Button>
            :
             formatDate(cancel_date)
    )

    return (
      <tr className='bg-gray-dark' key={id}>
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
          { formatDate(start_date) }
        </td>
        <td>
          { formatDate(end_date) }
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
          { isActive }
        </td>
        <td>
          { renderButton }
        </td>
      </tr>
    )
  }
}

Subscription.propTypes = {
  subscription: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  confirmCancelation: PropTypes.func.isRequired,
}
