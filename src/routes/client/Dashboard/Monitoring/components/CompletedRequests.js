import React from 'react'

import CompletedRequest from './CompletedRequest';
import {
  Panel,
  Table,
  Row,
  Col,
  Label,
  Button,
  Divider,
  Loader
} from 'components';

const CompletedRequests = ({ isFetching, completed }) => (

  !isFetching &&
    <Panel
      type='color-border-full'
      bsStyle='success'
      background='default'
      maxHeight={300}
      header={
        <h4 className='panel-title'>
          Completed Requests
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
                Removed URl
              </th>
              <th>
                Requested at
              </th>
              <th>
                Completed at
              </th>
            </tr>
          </thead>
          <tbody>
            {
              completed.map(
                record =>
                <CompletedRequest
                  record={record}
                  key={record.id}
                />
                )
            }
          </tbody>
        </Table>
      </Panel>
)

export default CompletedRequests;
