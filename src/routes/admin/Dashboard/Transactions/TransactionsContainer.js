import React from 'react';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import {
  TRANSACTION_CANCEL_SUCCESS,
  TRANSACTION_CANCEL_FAILURE,
  getTransactions,
  cancelTransaction
} from './modules/transactions'

import Transactions from './components/Transactions';

// these are the search params for fetching all transactions
const defaultSearchParams = { q: { id_not_eq: 0 }}

class TransactionsContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      queryName: 'All Transactions',
      showModal: false,
      transactionInProgress: {},
    }

    this.getNextPage = this.getNextPage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCancelTransaction = this.handleCancelTransaction.bind(this);
    this.confirmCancelTransaction = this.confirmCancelTransaction.bind(this);
    this.hideModal = this.hideModal.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this);
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
    this.fetchTransactions(defaultSearchParams)
  }

  fetchTransactions(params, pageNum=1) {
    this.props.getTransactions(params, pageNum)
  }

  getNextPage(pageNum) {
    this.setState({ pageNum: parseInt(pageNum) })
    this.fetchTransactions(defaultSearchParams, pageNum)
  }

  handleSearch(input) {
    const params = {
      q: {
         id_eq: input
      }
    }
    this.fetchTransactions(params)
    this.setState({ queryName: input })
  }

  handleCancelTransaction() {
    this.props.cancelTransaction(this.state.transactionInProgress.id)
    .then(res => this.handleCancelTransactionResponse(res))
    .catch(
      error => this.handleFailure(error)
      //error => console.log('error', error)
    )
    this.hideModal()
  }

  handleCancelTransactionResponse(res) {
    switch(res.type) {
      case TRANSACTION_CANCEL_SUCCESS:
        this.handleSuccess()
    }
  }

  handleSuccess() {
    this.setState({
      isFetching: false,
      notification: {
        message: 'Transaction was successfully canceled'
      }
    })
    setTimeout(() => {
      this.setState({notification: null});
    }, 5000)
  }

  confirmCancelTransaction(transaction) {
    this.setState({
      transactionInProgress: transaction,
      showModal: true
    })
  }

  hideModal() {
    this.setState({showModal: false})
  }

  render() {
    const { pagination } = this.props.transactions

    const paginationItems = (
      pagination &&
        Math.ceil(pagination.total / pagination.limit)
    )
    const limit = pagination && pagination.limit
    const total = pagination && pagination.total
    const errorMessage = this.props.transactions.error &&
      this.props.transactions.error.response.data.message

    return (
      <Transactions
        transactions={this.props.transactions.all}
        handleCancelTransaction={this.handleCancelTransaction}
        confirmCancelTransaction={this.confirmCancelTransaction}
        showModal={this.state.showModal}
        transactionInProgress={this.state.transactionInProgress}
        hideModal={this.hideModal}
        paginationItems={paginationItems}
        pageNum={this.state.pageNum}
        isFetching={this.props.transactions.isFetching}
        getNextPage={this.getNextPage}
        handleSearch={this.handleSearch}
        queryName={this.state.queryName}
        limit={limit}
        total={total}
        errorMessage={errorMessage}
        notification={this.state.notification}
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
