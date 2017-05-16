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

  const renderTable = (
    !isFetching && monitoringSites &&
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
            )
        }
      </tbody>
  )

  const renderLoader = (
    isFetching &&
      <div className='container'>
        <div className="spinner">
          <div className="col-md-12">
            <Loading type='bubbles' color='white' />
          </div>
        </div>
      </div>
  )

  return (
    <div>
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
          { renderTable }
      </Table>
      { renderLoader }
    </div>
  )
}

export default MonitoringSites;
