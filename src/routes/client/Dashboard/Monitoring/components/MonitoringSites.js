import React from 'react';
import _ from 'underscore';
import Loading from 'react-loading';

import MonitoringSite from './MonitoringSite';
import {
  Table,
  Label,
  Button
} from 'components';

const MonitoringSites = props => {
  const { monitoringSites, handleClick, siteIds, isFetching } = props

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
                    monitoringSite =>
                    <MonitoringSite
                      monitoringSite={monitoringSite}
                      key={monitoringSite.id}
                      handleClick={handleClick}
                      status={status}
                    />
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

export default MonitoringSites;
