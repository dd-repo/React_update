import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { formatDate } from 'utils'

import { DropdownButton, MenuItem, Label } from 'components'

const REMOVAL_STATUS = {
  'requested': {
    style: 'danger'
  },
  'inprogress': {
    style: 'info'
  },
  'protected': {
    style: 'success'
  }
}

export default class RemovalRequested extends Component {

  _onSelect = nextStatus => {
    this.props.handleClick({...this.props.removal, nextStatus})
  }

  render () {
    const {
      id,
      site,
      status,
      client_name,
      client_id,
      age,
      updated_at,
      addresses
    } = this.props.removal

    const siteURL = `http://www.${site}`
    const friendlyURL = `www.${site}`
    const address = addresses[0] ? addresses[0].address1 : ''
    const removalStatus = REMOVAL_STATUS[status]
    const renderStatus = status === 'protected' ? 'completed' : status
    const isRequested = status === 'requested'
    const isInProgress = status === 'inprogress'
    let renderButton = null

    if (isRequested) {
        renderButton = <DropdownButton 
          onSelect={this._onSelect}
          title='Actions'
          bsStyle='danger'
          id='dropdown-basic-4'
          bsSize='lg'
          className='m-b-1'
        >
          <MenuItem eventKey="inprogress">In Progress</MenuItem>
          <MenuItem eventKey="protected">Record not found</MenuItem>
          <MenuItem eventKey="skip">Skip Record</MenuItem>
          <MenuItem eventKey="completed">completed</MenuItem>
        </DropdownButton>
      } else {
        renderButton = <DropdownButton
          onSelect={this._onSelect}
          title='Actions'
          bsStyle='danger'
          id='dropdown-basic-4'
          bsSize='lg'
          className='m-b-1'
        >
          <MenuItem eventKey="completed">Complete</MenuItem>
          <MenuItem eventKey="skip">Skip Record</MenuItem>
        </DropdownButton>
      }

    return (
      <tr className='bg-gray-darker' key={id}>
        <td>
          {id}
        </td>
        <td>
          <Link to={`/admin/dashboard/users/client/${client_id}`}>
            {client_name}
          </Link>
        </td>
        <td>
          {age}
        </td>
        <td>
          {address}
        </td>
        <td className='text-white'>
          <a href={siteURL} target='_blank'>
            {friendlyURL}
          </a>
        </td>
        <td>
          {formatDate(updated_at)}
        </td>
        <td className='text-right'>
          <Label
            outline
            className='text-uppercase'
            bsStyle={removalStatus.style}
          >
            {renderStatus}
          </Label>
        </td>
        <td>
          {renderButton}
        </td>
      </tr>
    )
  }
}

RemovalRequested.propTypes = {
  removal: PropTypes.object,
  handleClick: PropTypes.func.isRequired
}
