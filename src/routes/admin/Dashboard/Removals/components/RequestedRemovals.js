import React from 'react';
import Loading from 'react-loading';

import {
  Table,
  Label,
  Button
} from 'components'

const STATUS_LABEL = {
  'requested'  : 'danger',
  'in progress': 'info',
  'completed'  : 'success'
}

const BUTTON_LABEL = {
  'requested'   : 'Mark as in progress',
  'in progress' : 'Mark as completed',
  'completed'   : 'Complete'
}

const RequestedRemovals = (props) => {
  const { removals, isFetching, handleClick } = props

  const renderRequestedRemovals = removal => {
    const {
      id,
      site,
      status,
      status_label,
      client_name,
      age,
      addresses,
      is_active
    } = removal
    const siteURL = `http://www.${site}`
    const friendlyURL = `www.${site}`
    const address = addresses[0].address1
    const statusLabel = STATUS_LABEL[status]
    const isComplete = status === 'completed'
    const buttonLabel = BUTTON_LABEL[status]

    return (
      <tr className='bg-gray-darker' key={id}>
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
            bsStyle={statusLabel}
          >
            { status }
          </Label>
        </td>
        <td>
          <Button
            bsStyle={statusLabel}
            disabled={isComplete}
            onClick={() => handleClick(id, 'completed')}
          >
            { buttonLabel }
          </Button>
        </td>
      </tr>
    )
  }

  return (
    <div>
      {
        !isFetching
          ?
            <Table>
              <thead>
                <tr>
                  <th>
                    client name
                  </th>
                  <th>
                    client age
                  </th>
                  <th>
                    client address
                  </th>
                  <th>
                    site Link
                  </th>
                  <th className='text-right'>
                    status
                  </th>
                  <th>
                    action
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  removals.map(
                    removal => renderRequestedRemovals(removal)
                  )}
              </tbody>
            </Table>
            :
              <div className='container'>
                <div className="spinner">
                  <div className="col-md-12">
                    <Loading type='bubbles' color='white' />
                  </div>
                </div>
              </div>
            }

    </div>
  )
}

export default RequestedRemovals;
