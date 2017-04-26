import React from 'react';
import Loading from 'react-loading';

import {
  Table,
  Label,
  Button,
  Row,
  Pagination
} from 'components'

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

const RequestedRemovals = (props) => {
  const {
    removals,
    pagination,
    isFetching,
    handleClick,
    pageNum,
    getNextPage
  } = props

  const paginationItems = () => {
    const { total, limit } = pagination
    return  Math.ceil(total / limit)
  }

  const renderRequestedRemovals = removal => {
    const {
      id,
      site,
      status,
      status_label,
      client_name,
      age,
      addresses,
      is_active,
    } = removal
    const removalStatus = REMOVAL_STATUS[status]
    const siteURL = `http://www.${site}`
    const friendlyURL = `www.${site}`
    const address = addresses[0].address1
    const isComplete = status === 'completed'

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
            bsStyle={removalStatus.style}
          >
            { status }
          </Label>
        </td>
        <td>
          <Button
            bsStyle={removalStatus.style}
            disabled={isComplete}
            onClick={() => handleClick(id, removalStatus.nextStatus)}
          >
            { removalStatus.buttonLabel }
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
            <Row>
              <Pagination
                bsSize="medium"
                items={paginationItems()}
                activePage={pageNum}
                boundaryLinks
                maxButtons={5}
                prev
                next
                first
                last
                ellipsis
                onSelect={getNextPage}
              />

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
            </Row>
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
