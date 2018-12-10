import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from 'utils';
import capitalize from 'utils/capitalize';


const MonitoringRequest = ({ request }) => {
  const {
    current_requested_at,
    updated_at,
    id,
    site,
    status,
    total_count
  } = request

  const siteURL = `http://www.${site}`
  const siteName = capitalize(site.slice(0, -4))

  return (
    <tr key={id}>
      <td className='text-white'>
        <a href={siteURL} target='_blank'>
          { siteName }
        </a>
      </td>
      <td>
        { formatDate(current_requested_at) || formatDate(updated_at) }
      </td>
      <td>
        <span className=''>
          <h4 className="m-t-0 f-w-300 m-b-0">
            { total_count }
          </h4>
        </span>
      </td>
    </tr>
  )
}

MonitoringRequest.propTypes = {
}
export default MonitoringRequest;
