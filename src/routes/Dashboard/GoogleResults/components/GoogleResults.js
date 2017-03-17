import React from 'react';
import Loading from 'react-loading';
import { Link } from 'react-router';
//import uid from 'node-uuid';

import {
    Row,
    Col,
    Panel,
    Button,
    Pagination,
    StarRating,
    Divider
} from 'components';

import SearchInput from './SearchInput';
import SearchResultTypes from './SearchResultTypes';
import SearchKeywords from './SearchKeywords';
import SearchPeriod from './SearchPeriod';

import GoogleResult from './GoogleResult';
import renderSection from 'modules/sectionRender';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';

const GoogleResults = ({ results, keywords, getResults, isFetching }) => {
  return (
    <Row>
      <Col lg={ 2 }>
        <SearchKeywords
          keywords={keywords}
          getResults={getResults}
        />
      </Col>
      <Pagination
        bsSize="medium"
        items={3}
        activePage={1}
        boundaryLinks
        prev
        next
        first
        last
        ellipsis
      />
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
                  <p>Retrieving your google results for <strong>{keywords.currentKeyword.value}</strong></p>
                  <Loading type='bubbles' color='white' />
                </div>
              </div>
            </div>
            :
          results.map((result, key) => (
            <GoogleResult result={result} key={key} />
            ))
        }
      </Col>
    </Row>
  )
}

export default GoogleResults;
