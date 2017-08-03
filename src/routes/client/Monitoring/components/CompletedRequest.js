import React, { Component, PropTypes } from 'react';
import { formatDate } from 'utils/dateHelper';
import capitalize from 'utils/capitalize';
import classes from './Monitoring.scss';
import { Media } from 'components';

const CompletedRequest = ({ record }) => {
  const { id, created_at, completed_at, requested_at, removed_url, site } = record
  const truncatedUrl = removed_url ? removed_url.substring(0, 100) : ''
  const siteName = capitalize(site.slice(0, -4))

  return (
    <tr key={id}>
      <td>
        <Media>
          <Media.Left>
            <a href='javascript:void(0)'>
              <span className="fa-stack fa-lg">
                <i className="fa fa-square fa-stack-2x text-success"></i>
                <i className="fa fa-shield fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          </Media.Left>
          <Media.Body className={ classes.mediaFix }>
            <Media.Heading componentClass='div'>
              <span className='text-white'>
                { siteName }
              </span>
            </Media.Heading>
          </Media.Body>
        </Media>
      </td>
      <td>
        <a href={removed_url} target='_blank'>
          { truncatedUrl }
        </a>
      </td>
      <td>
        <span className='text-white'>
        { formatDate(requested_at) }
        </span>
      </td>
      <td>
        <span className='text-white'>
        { formatDate(completed_at) }
        </span>
      </td>
    </tr>

  )
}

export default CompletedRequest;
