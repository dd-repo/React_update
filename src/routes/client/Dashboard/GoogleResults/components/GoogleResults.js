import React, { Component } from 'react';
import Loading from 'react-loading';
import { Link } from 'react-router';
//import uid from 'node-uuid';

import {
  Alert,
  Row,
  Col,
  Panel,
  Button,
  Pagination,
  StarRating,
  Divider
} from 'components';

import SearchKeywords from './SearchKeywords';
import GoogleResult from './GoogleResult';
import renderSection from 'modules/sectionRender';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';

export default class GoogleResults extends Component {
  constructor(props) {
    super(props)

    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    this.props.getResults(this.props.keywords.currentKeyword)
  }

  render() {
    const {
      results,
      pagination,
      keywords,
      getResults,
      getNextPage,
      isFetching,
      handleRemoval,
      pageNum
    } = this.props

    const paginationItems = pagination !== undefined &&
      Math.ceil(pagination.total / pagination.limit)

    const currentKeyword = keywords.currentKeyword ? keywords.currentKeyword.value : ''

    return (
      <Row>
        <Pagination
          bsSize="medium"
          items={paginationItems || 1}
          activePage={pageNum}
          boundaryLinks
          prev
          next
          first
          last
          ellipsis
          onSelect={getNextPage}
        />
        <Col lg={ 2 }>
          <SearchKeywords
            keywords={keywords}
            getResults={getResults}
          />
        </Col>
        <Col lg={ 10 }>
          <Divider className='m-t-3 m-b-2'>
            All Results
          </Divider>

          {
            isFetching
              ?
                <div className='container'>
                  <div className="spinner">
                    <div className="col-md-12 pricing-left">
                      <p>Retrieving your google results for <strong>{currentKeyword}</strong></p>
                      <Loading type='bubbles' color='white' />
                    </div>
                  </div>
                </div>
                :

                  !results
                    ?
                      <Alert bsStyle='danger' noBackground>
                        <h5 className='m-y-0'>Oh Snap!</h5>
                        <p className='m-b-1'>
                          Could not retreive your search results.
                        </p>
                        <Button bsStyle="danger" onClick={this._onClick}>Try again</Button>
                      </Alert>
                      :
                        results.map((result, i) => (
                          <GoogleResult
                            result={result}
                            key={i}
                            handleRemoval={handleRemoval}
                          />
                          ))
          }

        </Col>
      </Row>
    )
  }
}
