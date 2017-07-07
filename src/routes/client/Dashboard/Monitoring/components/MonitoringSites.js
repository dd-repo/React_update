import React from 'react';
import _ from 'underscore';

import MonitoringSite from './MonitoringSite';
import {
  Table,
  Label,
  Button,
  Loader
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
      <Loader />
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
