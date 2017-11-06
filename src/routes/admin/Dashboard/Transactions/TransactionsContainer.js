import React from 'react'

import { RoutedComponent, connect } from 'routes/routedComponent'
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout'
import { fetchTransactions, clearNotification } from './modules/transactions'
import { showModal, hideModal } from 'modules/modal'
import Transactions from './components/Transactions'

class TransactionsContainer extends RoutedComponent {
  constructor (props) {
    super(props)
    this.state = {
      pageNum: 1,
      queryName: 'All Transactions'
    }

    this.getNextPage = this.getNextPage.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  getLayoutOptions () {
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

  componentWillMount () {
    this.fetchTransactions()
  }

  fetchTransactions (params = {}, pageNum = 1) {
    this.props.fetchTransactions(params, pageNum)
  }

  getNextPage (pageNum) {
    this.setState({ pageNum: parseInt(pageNum) })
    this.fetchTransactions({}, pageNum)
  }

  handleSearch (input) {
    const queryName = input !== '' ? input : 'All Transactions'
    const params = {
      q: {
        id_eq: input
      }
    }
    this.fetchTransactions(params)
    this.setState({ queryName })
  }

  clearNotification = () => {
    this.props.clearNotification()
  }

  render () {
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
        showModal={this.props.showModal}
        hideModal={this.props.hideModal}
        paginationItems={paginationItems}
        pageNum={this.state.pageNum}
        isFetching={this.props.transactions.isFetching}
        getNextPage={this.getNextPage}
        handleSearch={this.handleSearch}
        queryName={this.state.queryName}
        limit={limit}
        total={total}
        notification={this.props.transactions.notification}
        clearMessage={this.clearNotification}
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
  fetchTransactions,
  showModal,
  hideModal,
  clearNotification
}

export default connect(mapStateToProps, mapActionCreators)(TransactionsContainer)
