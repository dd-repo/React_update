import React, { Component, PropTypes } from 'react';
import { formatDate } from 'utils/dateHelper';
import capitalize from 'utils/capitalize';

const CompletedRequest = ({ record }) => {
  const { id, created_at, completed_at, requested_at, removed_url, site } = record
  const truncatedUrl = removed_url ? removed_url.substring(0, 100) : ''
  const siteName = capitalize(site.slice(0, -4))

  return (
    <tr className='bg-gray-darker' key={id}>
      <td className='text-white'>
        { siteName }
      </td>
      <td>
        <a href={removed_url} target='_blank'>
          { truncatedUrl }
        </a>
      </td>
      <td>
        { formatDate(requested_at) }
      </td>
      <td>
        { formatDate(completed_at) }
      </td>
    </tr>
  )
}

export default CompletedRequest;

