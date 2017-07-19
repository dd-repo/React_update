import React, { Component, PropTypes } from 'react';
import { formatDate } from 'utils/dateHelper';

import { DropdownButton, MenuItem, Button, Label } from 'components';

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
  },
  'protected': {
    style:'success',
    buttonLabel: 'Complete'
  },
  'pending': {
    style: 'warning',
    buttonLabel: 'Pending'
  },
  'queued': {
    style: 'warning',
    buttonLabel: 'Pending'
  }
}

export default class RemovalRequested extends Component {
  constructor(props) {
    super(props)

    this._onSelect = this._onSelect.bind(this)
  }

  _onSelect(nextStatus) {
    this.props.removal.nextStatus = nextStatus
    this.props.handleClick(this.props.removal)
  }

  render() {
    const {
      id,
      site,
      status,
      status_label,
      client_name,
      age,
      updated_at,
      addresses,
      is_active,
    } = this.props.removal

    const siteURL = `http://www.${site}`
    const friendlyURL = `www.${site}`
    //const address = addresses[0] ? addresses[0].address1 : ''
    const address = ''
    const isComplete = status === 'completed'
    const removalStatus = REMOVAL_STATUS[status]
    const renderStatus = status === 'protected' ? 'completed' : status

    const renderButton = (
      !isComplete &&
        <DropdownButton onSelect={this._onSelect} title='Actions' bsStyle='danger' id='dropdown-basic-4' bsSize='lg' className='m-b-1'>
          <MenuItem eventKey="inprogress">In Progress</MenuItem>
          <MenuItem eventKey="completed">Complete</MenuItem>
          <MenuItem eventKey="protected">Protected</MenuItem>
        </DropdownButton>
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
        <td>
          { formatDate(updated_at) }
        </td>
        <td className='text-right'>
          <Label
            outline
            className='text-uppercase'
            bsStyle={removalStatus.style}
          >
            { renderStatus }
          </Label>
        </td>
        <td>
          { renderButton }
        </td>
      </tr>
    )
  }
}

RemovalRequested.propTypes = {
  removal: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
}
