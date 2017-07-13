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
    this.updateTransaction = this.updateTransaction.bind(this);
    this.confirmTransaction = this.confirmTransaction.bind(this);
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
    this.fetchTransactions()
  }

  fetchTransactions(params={}, pageNum=1) {
    this.props.getTransactions(params, pageNum)
  }

  getNextPage(pageNum) {
    this.setState({ pageNum: parseInt(pageNum) })
    this.fetchTransactions({}, pageNum)
  }

  handleSearch(input) {
    const queryName = input !== '' ? input : 'All Transactions'
    const params = {
      q: {
         id_eq: input
      }
    }
    this.fetchTransactions(params)
    this.setState({ queryName })
  }

  updateTransaction() {
    this.props.cancelTransaction(this.state.transactionInProgress.id)
    .then(res => this.updateTransactionResponse(res))
    .catch(
      error => this.handleFailure(error)
    )
    this.hideModal()
  }

  updateTransactionResponse(res) {
    switch(res.type) {
      case TRANSACTION_CANCEL_SUCCESS:
        this.handleSuccess()
    }
  }

  handleSuccess() {
    this.setState({
      notification: {
        message: 'Transaction was successfully canceled'
      }
    })
    setTimeout(() => {
      this.setState({notification: null});
    }, 5000)
  }

  confirmTransaction(transaction) {
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
        updateTransaction={this.updateTransaction}
        confirmTransaction={this.confirmTransaction}
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
