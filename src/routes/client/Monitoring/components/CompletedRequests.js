import React, { PropTypes } from 'react'

import CompletedRequest from './CompletedRequest';
import classes from './Monitoring.scss';
import {
  Panel,
  Table
} from 'components';

const CompletedRequests = ({
  isFetching,
  completed,
  maxHeight,
  title,
  type,
  bsStyle
}) => (

  completed.length ?
    <Panel
      type={type}
      bsStyle={bsStyle}
      maxHeight={maxHeight}
      header={
        <h4 className='panel-title'>
          {title}
        </h4>
        }
      >
        <Table className={ classes.mostViewedItemsTable } responsive>
          <thead>
            <tr>
              <th>
                <strong>Site Name</strong>
              </th>
              <th>
                <strong>Removed URL</strong>
              </th>
              <th>
                <strong>Requested</strong>
              </th>
              <th>
                <strong>Completed</strong>
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
        :
          <div></div>
)

CompletedRequests.propsTypes = {
  isFetching: PropTypes.bool,
  completed: PropTypes.array.isRequired,
  maxHeight: PropTypes.number,
  title: PropTypes.string,
  bsStyle: PropTypes.string,
  type: PropTypes.string
}

export default CompletedRequests;
