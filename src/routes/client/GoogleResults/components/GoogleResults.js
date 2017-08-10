import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import {
  Alert,
  Row,
  Col,
  Panel,
  Button,
  Pagination,
  Divider,
  Modal,
  Loader
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
      paginationItems,
      paginationTotal,
      keywords,
      currentKeyword,
      getResults,
      getNextPage,
      isFetching,
      handleRemoval,
      pageNum,
      removalAlert,
      showModal,
      hideModal,
    } = this.props

    const renderModal = (
      <Modal bsStyle='success' show={showModal} onHide={hideModal}>
        <Modal.Body>
          "We've received your request and we'll need a little bit more information to complete it. An account manager will give you a call within the next 48 hours to discuss this removal.
          <p>Can't wait? Give us a call at <strong>(844) 641-7829"</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='success' onClick={hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    )

      const renderSpinner = (
        isFetching &&
          <Loader />
      )

      const renderPagination = (
        <div className="text-center">
          <Pagination
            bsSize="medium"
            items={paginationItems}
            activePage={pageNum}
            boundaryLinks
            prev
            next
            first
            last
            ellipsis
            onSelect={getNextPage}
          />
        </div>
      )

      const renderResults = (
        results && !isFetching &&
          <div>
            { results.map((result, i) => (
              <GoogleResult
                result={result}
                key={i}
                handleRemoval={handleRemoval}
                removalAlert={removalAlert}
              />
              ))
            }
            { renderPagination }
          </div>
      )

      const renderPopupAlert = (
        !results && !isFetching &&
          <Alert bsStyle='danger' noBackground>
            <h5 className='m-y-0'>We're Sorry!</h5>
            <p className='m-b-1'>
              Could not retreive your search results.
            </p>
            <Button bsStyle="danger" onClick={this._onClick}>Try again</Button>
          </Alert>
      )

      return (
        <Row>
          <Col lg={ 10 }>
            <SearchKeywords
              keywords={keywords}
              getResults={getResults}
              paginationTotal={paginationTotal}
            />
          </Col>
          <Col lg={ 12 }>
            {' '}
            <Divider className='m-t-3 m-b-2'>
              All Results
            </Divider>
            { renderSpinner }
            { renderResults }
            { renderPopupAlert }
            { renderModal }
          </Col>
        </Row>
      )
  }
}

GoogleResults.propTypes = {
  results: PropTypes.array,
  keywords: PropTypes.object,
  currentKeyword: PropTypes.object,
  getResults: PropTypes.func,
  getNextPage: PropTypes.func,
  handleRemoval: PropTypes.func,
  paginationItems: PropTypes.number,
  paginationTotal: PropTypes.number,
  pageNum: PropTypes.number,
  isFetching: PropTypes.bool,
  showModal: PropTypes.bool,
  hideModal: PropTypes.func
}

GoogleResults.defaultProps = {
  currentKeyword: { value: '' }
}
