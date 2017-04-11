import React from 'react';
import _ from 'underscore';
import Loading from 'react-loading';

import {
  Table,
  Label,
  Button
} from 'components'

const Monitoring = props => {
  const { monitoringSites, handleClick, siteIds, isFetching } = props

  const statusLabel = {
    'requested': 'danger',
    'queued': 'info',
  };

  const renderMonitoringSites = monitoring => {
      const { id, site, status } = monitoring
      const siteURL = `http://www.${site}`
      const friendlyURL = `www.${site}`
      const title = site.slice(0, -4)
      const clicked =  status !== 'pending'

      return (
        <tr className='bg-gray-darker' key={id}>
          <td>
              { title }
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
              bsStyle={statusLabel[status]}>
              { status }
            </Label>
          </td>
          <td>
            <Button
              bsStyle='danger'
              disabled={clicked}
              onClick={() => handleClick(id)}
            >
              Request Removal
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
                    Title
                  </th>
                  <th>
                    Site Link
                  </th>
                  <th className='text-right'>
                    Status
                  </th>
                  <th>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  monitoringSites.map(
                    monitoring => renderMonitoringSites(monitoring)
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

export default Monitoring;
