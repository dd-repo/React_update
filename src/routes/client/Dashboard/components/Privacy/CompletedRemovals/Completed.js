import React, { PropTypes } from 'react'

import CompletedRequest from 'routes/client/Monitoring/components/CompletedRequest';
import classes from './completed.scss';
import {
  Panel,
  Table
} from 'components';

const CompletedRemovals = ({ completed }) => (
  completed && completed.length > 0 ?
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
            <CompletedRemoval
              record={record}
              key={record.id}
            />
            )
        }
      </tbody>
    </Table>
      :
        <span></span>
)

CompletedRemovals.propsTypes = {
  completed: PropTypes.array.isRequired,
}

export default CompletedRemovals;

