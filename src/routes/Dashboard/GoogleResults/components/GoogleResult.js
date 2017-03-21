import React from 'react';

import classes from './googleResults.scss';

const GoogleResult = ( { result } ) => {
  const renderRemovalButton = (
    result.listing_site_id &&
      <button className="danger alert-danger">Request removal</button>
  )

  return (
    <div className={ classes.searchResultDefault }>
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
