import React from 'react';

import classes from './googleResults.scss';

const GoogleResult = ({ result, key }) => {
  const renderRemovalButton = (
    result.listing_site_id &&
      <button className="danger alert-danger">Request removal</button>
  )
  console.log('in google result');

  return (
    <div className={ classes.searchResultDefault } key={key}>
      <h4 className='m-b-0'>
        <a href='javascript:void(0)'>
          { result.title }
        </a>
      </h4>
      <span>
        { renderRemovalButton }
      </span>
      <a href={result.friendly_url} className='text-success m-r-2'>
        { result.friendly_url }
      </a>
      <p className='m-y-1'>
        { result.description }
      </p>
    </div>
  )
}

export default GoogleResult;
