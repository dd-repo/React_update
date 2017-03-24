import React from 'react';

import { Row, Col, Button, Divider } from 'components'

import classes from './googleResults.scss';

const GoogleResult = ( { result } ) => {
  const renderRemovalButton = (
    result.listing_site_id &&
      <Button bsStyle='danger'>Remove</Button>
  )

  return (
    <Row>
      <Col lg={10}>
        <div className={ classes.searchResultDefault }>
          <h4 className='m-b-0'>
            <a href='javascript:void(0)'>
              { result.title }
            </a>
          </h4>
          <a href={result.friendly_url} className='text-success m-r-2'>
            { result.friendly_url }
          </a>
          <p className='m-y-1'>
            { result.description }
          </p>
        </div>
      </Col>
      <Col lg={2}>
        { renderRemovalButton }
      </Col>
    </Row>
  )
}

export default GoogleResult;
