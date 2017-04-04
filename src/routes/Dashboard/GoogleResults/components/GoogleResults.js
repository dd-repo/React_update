import React from 'react';
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

import SearchInput from './SearchInput';
import SearchKeywords from './SearchKeywords';
import SearchPeriod from './SearchPeriod';

import GoogleResult from './GoogleResult';
import renderSection from 'modules/sectionRender';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';

const GoogleResults = ({ results, keywords, getResults, getNextPage, isFetching, pageNum=1 }) => {
  return (
    <Row>
      <Pagination
        bsSize="medium"
        items={3}
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
                  <p>Retrieving your google results for <strong>{keywords.currentKeyword.value}</strong></p>
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
                    <Button bsStyle="danger" onClick={() => getResults(keywords.currentKeyword)}>Try again</Button>
                  </Alert>
                  :
                    results.map((result, i) => (
                      <GoogleResult result={result} key={i} />
                      ))
        }

      </Col>
    </Row>
  )
}

export default GoogleResults;
