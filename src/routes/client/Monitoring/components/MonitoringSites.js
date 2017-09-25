import React from 'react';
import MonitoringSite from './MonitoringSite';
import {
  Panel,
  Table
} from 'components';

const MonitoringSites = ({ handleRemovalRequest, isFetching, sites }) => (
  !isFetching &&
    <Panel
      type='color-title-border'
      bsStyle='danger'
      background='default'
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
                records removed
              </th>
              <th>
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              sites.map(
                site =>
                <MonitoringSite
                  monitoringSite={site}
                  key={site.id}
                  handleRemovalRequest={handleRemovalRequest}
                />
                )
            }
          </tbody>
        </Table>
      </Panel>
)

export default MonitoringSites;
