import React from 'react';
//import uid from 'node-uuid';
//import _ from 'underscore';
//import numeral from 'numeral';
import { Link } from 'react-router';
import {
    Row,
    Col,
    Panel,
    Button,
    Pagination,
    StarRating,
    Divider
} from 'components';

import { SearchInput } from './SearchInput';

import Spinner from 'components/Spinner';
import GoogleResult from './GoogleResult';
import renderSection from 'modules/sectionRender';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import { Colors } from 'consts';


const GoogleResults = ({ results, keywords, isFetching, getNextPage }) => {
  return (
    <Row>
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
        onSelect={getNextPage}
      />
      <Col lg={ 10 }>
        <Divider className='m-t-3 m-b-2'>
          All Results
        </Divider>
        {
          results.map((result, key) => (
            <GoogleResult result={result} key={key} />
            ))
        }
      </Col>
    </Row>
  )
}

export default GoogleResults;
