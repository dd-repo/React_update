import React, { PropTypes, Component } from 'react';

import { Row, Col, Button } from 'components'

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
    <Row className={ classes.searchResultDefault }>
        <Col xs={ 2 } sm={ 1 } md={ 1 }>
          <h3 className='rankingPosition m-r-2 pull-left'>{result.rank}</h3>
        </Col>
        <Col xs={ 9 } sm={ 9 } md={ 9 }>
        <Row>
          <h4 className='m-b-0'>
            <a href={result.url} target='_blank'>
              { result.title }
            </a>
          </h4>
        </Row>
        <Row>
          <a href={result.url} target='_blank' className='text-success m-r-2'>
            { result.url }
          </a>
          <p className='m-y-1'>
            { result.description }
          </p>
        </Row>
      </Col>
      <Col sm={ 2 } md={ 2 }>
        { renderRemovalButton }
      </Col>
    </Row>
  )
 }
}

GoogleResult.propsTypes = {
  result: PropTypes.object.isRequired,
  handleRemoval: PropTypes.func
}
