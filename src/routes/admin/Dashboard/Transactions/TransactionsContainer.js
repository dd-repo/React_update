import React from 'react';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import {
  getTransactions,
  cancelTransaction
} from './modules/transactions'
import Transactions from './components/Transactions';

class TransactionsContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: true,
      pageNum: 1,
      queryName: 'All Transactions'
    }

    this.getNextPage = this.getNextPage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCancelTransaction = this.handleCancelTransaction.bind(this);
  }

  getLayoutOptions() {
    return {
      contentView: CONTENT_VIEW_STATIC,
      sidebarEnabled: true,
      navbarEnabled: true,
      footerEnabled: true,
      headerEnabled: false
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    this.fetchTransactions()
  }

  fetchTransactions(params={}, pageNum=1) {
    this.props.getTransactions(params, pageNum)
  }

  getNextPage(pageNum) {
    this.setState({ pageNum: parseInt(pageNum) })
    this.fetchTransactions({}, pageNum)
  }

  handleSearch(e, input) {
    e.preventDefault()
    const params = {
      q: {
        first_name_or_last_name_or_email_transaction_id_cont: input
      }
    }
    this.fetchTransactions(params)
  }

  handleCancelTransaction(id) {
    this.props.cancelTransaction(id)
  }

  render() {
    const { pagination } = this.props.transactions

    const paginationItems = (
      pagination &&
        Math.ceil(pagination.total / pagination.limit)
    )
    const limit = pagination && pagination.limit
    const total = pagination && pagination.total

    return (
      <Transactions
        transactions={this.props.transactions.all}
        handleCancelTransaction={this.handleCancelTransaction}
        paginationItems={paginationItems}
        pageNum={this.state.pageNum}
        isFetching={this.props.transactions.isFetching}
        getNextPage={this.getNextPage}
        handleSearch={this.handleSearch}
        queryName={this.state.queryName}
        limit={limit}
        total={total}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.transactions
  }
}

const mapActionCreators = {
  getTransactions,
  cancelTransaction
}

export default connect(mapStateToProps, mapActionCreators)(TransactionsContainer)
