import React, { Component } from 'react';

import { Row, Col, Button, Divider } from 'components'

import classes from './googleResults.scss';

export default class GoogleResult extends Component {
  constructor(props) {
    super(props)

    this._onClick = this._onClick.bind(this)
  }

 _onClick() {
   this.props.handleRemoval(this.props.result.id)
 }

 render() {
   const { result } = this.props
   const renderRemovalButton = (
     result.listing_site_id &&
      <Button
        bsStyle='danger'
        disabled={false}
        onClick={this._onClick}
      >
        Request Removal
      </Button>
  )

  return (
    <Row>
      <Col lg={10}>
        <div className={ classes.searchResultDefault }>
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
        </div>
      </Col>
      <Col lg={2}>
        { renderRemovalButton }
      </Col>
    </Row>
  )
 }
}
