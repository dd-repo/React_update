import React, { Component } from 'react';

import { Row, Col, Button, Divider, Media } from 'components'

import classes from './googleResults.scss';

 const REQUEST_REMOVALS = {
   'privacy': 'Privacy Removal',
   'removal': 'Request Removal'
 }

export default class GoogleResult extends Component {
  constructor(props) {
    super(props)

    this._onClick = this._onClick.bind(this)
  }

 _onClick() {
   const { id, is_type } = this.props.result
   this.props.handleRemoval(id, is_type)
 }

 render() {
   const { result } = this.props
   const disable = result.status ? true : false
   const buttonLabel = disable ? 'requested' : REQUEST_REMOVALS[result.is_type]

   const renderRemovalButton = (
     result.listing_site_id &&
      <Button
        bsStyle='danger'
        disabled={disable}
        onClick={this._onClick}
        className='pull-right'
      >
        { buttonLabel }
      </Button>
  )

  return (
    <Row>
      <div className={ classes.searchResultDefault }>
        <Media>
          <Media.Left>
            <h3 className='rankingPosition m-r-2 pull-left'>{result.rank}</h3>
          </Media.Left>
          <Media.Body>
          <h4 className='m-b-0'>
            <a href={result.url} target='_blank'>
              { result.title }
            </a>
          </h4>
        <a href={result.url} target='_blank' className='text-success m-r-2'>
          { result.url }
        </a>
        <p className='m-y-1'>
          { result.description }
        </p>
      </Media.Body>
          <Media.Right>
          { renderRemovalButton }
          </Media.Right>
      </Media>
      </div>
    </Row>
  )
 }
}
