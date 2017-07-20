import React, { Component, PropTypes } from 'react';
import Loading from 'react-loading';

import RootModal from 'components/Modals';
import Subscription from './Subscription';
import {
  Table,
  Col,
  Label,
  Panel,
  Button,
  Row,
  Pagination,
  Modal,
  SearchBar,
  Loader
} from 'components';

import { EditSubscriptionModal, CancelSubscriptionModal } from 'components/Modals'

const button = {
  label: <i className="fa fa-pencil"> Edit</i>,
  style: 'link'
}

export default class Subscriptions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      subscriptions,
      paginationItems,
      pageNum,
      getNextPage,
      isFetching,
      handleClick,
      handleSearch,
      resultCount,
      queryName,
      limit
    } = this.props

    const renderPagination = (
      !isFetching && (resultCount > limit) &&
        <div className="text-center">
          <Pagination
            bsSize="medium"
            items={paginationItems}
            activePage={pageNum}
            boundaryLinks
            maxButtons={5}
            prev
            next
            first
            last
            ellipsis
            onSelect={getNextPage}
          />
        </div>
    )

    const renderSubscriptions = (
      !isFetching && subscriptions &&
        subscriptions.map(
          subscription =>
          <Subscription
            subscription={subscription}
            key={subscription.id}
            handleClick={handleClick}
            button={button}
          />
        )
    )

    const renderLoader = isFetching && <Loader />

    const renderSearchBar = (
      <Col lg={6} lgOffset={3} className='m-b-2' >
        <SearchBar
          query={queryName}
          resultCount={resultCount}
          handleSearch={handleSearch}
        />
      </Col>
    )

    return (
      <Row>
        { renderSearchBar }
        <Table>
          <thead>
            <tr>
              <th>
                subscription id
              </th>
              <th>
                client name
              </th>
              <th>
                user id
              </th>
              <th>
                start date
              </th>
              <th>
                end date
              </th>
              <th>
                plan id
              </th>
              <th>
                plan description
              </th>
              <th>
                sales rep
              </th>
              <th>
                Card id
              </th>
              <th>
                account status
              </th>
              <th>
              </th>
            </tr>
          </thead>
          { renderSubscriptions }
        </Table>
        { renderPagination }
        { renderLoader }

        <RootModal />

      </Row>
    )
  }
}

Subscriptions.propTypes = {
  subscription: PropTypes.array,
  paginationItems: PropTypes.number,
  pageNum: PropTypes.number,
  isFetching: PropTypes.bool,
  getNextPage: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  queryName: PropTypes.string,
  handleSearch: PropTypes.func,
  resultCount: PropTypes.number,
  limit: PropTypes.number
}
