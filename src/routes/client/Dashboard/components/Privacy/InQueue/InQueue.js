import React from 'react';

import { formatDate } from 'utils';
import {
  Table
} from 'components';

const InQueue = ({ inQueue }) => {
  return (
    inQueue.length > 0 ?
    <Table>
      <thead>
        <tr>
          <th>
            name of site
          </th>
          <th>
            Date requested
          </th>
        </tr>
      </thead>
      <tbody>
        {
          inQueue.map(
            request =>
            <tr key={request.id}>
              <td className='text-dark'>
                <a href={`http://www.${request.site}`} target='_blank'>
                  { request.site }
                </a>
              </td>
              <td>
                { formatDate(request.current_requested_at) || formatDate(request.updated_at) }
              </td>
            </tr>
            )
        }
      </tbody>
    </Table>
      :
        <span></span>
  )
}

export default InQueue;
