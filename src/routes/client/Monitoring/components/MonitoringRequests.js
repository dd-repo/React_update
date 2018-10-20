import React from 'react';
import MonitoringRequest from './MonitoringRequest';

import {
  Panel,
  Table
} from 'components';


const MonitoringRequests = ({ requests, style, header, className }) => (
  requests.length > 0 ?
    <Panel
      bsStyle={style}
      background='default'
      className={className}
      header={
        <h4 className='panel-title'>
          { header }
        </h4>
        }
        maxHeight={208}
      >
        <Table>
          <thead>
            <tr>
              <th>
                name of site
              </th>
              <th>
                Date requested
              </th>
              <th>
                records removed
              </th>
            </tr>
          </thead>
          <tbody>
            {
              requests.map(
                request =>
                <MonitoringRequest
                  request={request}
                  key={request.id}
                />
                )
            }
          </tbody>
        </Table>
      </Panel>
        :
          <div></div>
)

export default MonitoringRequests;
