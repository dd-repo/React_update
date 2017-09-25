import React from 'react';
import PrivacyRemoval from 'routes/client/Monitoring/components/MonitoringSite';
import {
  Table
} from 'components'

const PrivacyRemovals = ({ privacyRemovals, handleRemovalRequest }) => {
  return (
    privacyRemovals.length > 0 ?
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
              privacyRemovals.map(
                site =>
                <PrivacyRemoval
                  monitoringSite={site}
                  key={site.id}
                  handleRemovalRequest={handleRemovalRequest}
                />
                )
            }
          </tbody>
        </Table>
        :
          <span></span>
  )
}

export default PrivacyRemovals;

