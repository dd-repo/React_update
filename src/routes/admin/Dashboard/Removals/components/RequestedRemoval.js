import React, { Component } from 'react';

import { Button, Label } from 'components';

const REMOVAL_STATUS = {
  'requested': {
    style: 'danger',
    buttonLabel: 'Mark as in progress',
    nextStatus: 'inprogress'
  },
  'inprogress': {
    style:'info',
    buttonLabel: 'Mark as complete',
    nextStatus: 'completed'
  },
  'completed': {
    style:'success',
    buttonLabel: 'Complete'
  }
}

export default class RemovalRequested extends Component {
  constructor(props) {
    super(props)

    this._onClick = this._onClick.bind(this)
  }

  _onClick() {
    const { id, status } = this.props.removal
    const nextStatus = REMOVAL_STATUS[status].nextStatus

    this.props.handleClick(id, nextStatus)
  }

  render() {
    const {
      id,
      site,
      status,
      status_label,
      client_name,
      age,
      addresses,
      is_active,
    } = this.props.removal

    const siteURL = `http://www.${site}`
    const friendlyURL = `www.${site}`
    const address = addresses[0].address1
    const isComplete = status === 'completed'
    const removalStatus = REMOVAL_STATUS[status]

    return (
      <tr className='bg-gray-darker' key={id}>
        <td>
          { id }
        </td>
        <td>
          { client_name }
        </td>
        <td>
          { age }
        </td>
        <td>
          { address }
        </td>
        <td className='text-white'>
          <a href={siteURL} target='_blank'>
            { friendlyURL }
          </a>

        </td>
        <td className='text-right'>
          <Label
            outline
            className='text-uppercase'
            bsStyle={removalStatus.style}
          >
            { status }
          </Label>
        </td>
        <td>
          <Button
            bsStyle={removalStatus.style}
            disabled={isComplete}
            onClick={this._onClick}
          >
            { removalStatus.buttonLabel }
          </Button>
        </td>
      </tr>
    )
  }
}
