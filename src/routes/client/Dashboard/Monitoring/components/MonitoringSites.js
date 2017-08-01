import React from 'react';
import _ from 'underscore';

import MonitoringSite from './MonitoringSite';
import {
  Panel,
  Table,
  Label,
  Button,
  Loader
} from 'components';

const MonitoringSites = props => {
  const { inProgress, inQueue, potentialRisks, handleClick, isFetching } = props

  const renderPotentialRisksTable = (
    !isFetching &&
      <Panel
        header={
          <h4 className='panel-title'>
            Potential Risks
          </h4>
          }
        >
          <Table>
            <thead>
              <tr>
                <th>
                  name of site
                </th>
                <th>
                  url
                </th>
                <th>
                  records removed
                </th>
                <th>
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {
                potentialRisks.map(
                  site =>
                  <MonitoringSite
                    monitoringSite={site}
                    key={site.id}
                    handleClick={handleClick}
                  />
                  )
              }
            </tbody>
          </Table>
        </Panel>
  )

  const renderRequestedTable = (list, selector) => (
    !isFetching &&
      <Panel
        header={
          <h4 className='panel-title'>
            {selector}
          </h4>
          }
        >
          <Table>
            <thead>
              <tr>
                <th>
                  Date requested
                </th>
                <th>
                  name of site
                </th>
                <th>
                  url
                </th>
                <th>
                  records removed
                </th>
              </tr>
            </thead>
            <tbody>
              {
                list.map(
                  site =>
                  <MonitoringSite
                    monitoringSite={site}
                    key={site.id}
                    handleClick={handleClick}
                  />
                  )
              }
            </tbody>
          </Table>
        </Panel>
  )

  const renderTableBody = list => (
    !isFetching &&
      <tbody>
        {
          list.map(
            site =>
            <MonitoringSite
              monitoringSite={site}
              key={site.id}
              handleClick={handleClick}
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
      { renderRequestedTable(inProgress, 'In Progress') }

      { renderRequestedTable(inQueue, 'In Queue') }

      { renderPotentialRisksTable }

      { renderLoader }
    </div>
  )
}

export default MonitoringSites;
