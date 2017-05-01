import React from 'react';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import { getTransactions } from './modules/transactions'
import Transactions from './components/Transactions';

class TransactionsContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = { isFetching: true, pageNum: 1 }

    this.getNextPage = this.getNextPage.bind(this);
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

  componentWillReceiveProps(nextProps) {
    nextProps.transactions.isFetching !== this.state.isFetching &&
      this.setState({
        isFetching: nextProps.transactions.isFetching,
      });
  }

  componentWillMount() {
    this.fetchTransactions()
  }

  fetchTransactions(pageNum=1) {
    this.props.getTransactions(pageNum)
  }

  getNextPage(pageNum) {
    console.log('pageNum', pageNum)
    this.setState({ pageNum: parseInt(pageNum) })
    this.fetchRemovalsRequested(pageNum)
  }

  render() {
    return (
      <Transactions
        transactions={this.props.transactions.all}
        pagination={this.props.transactions.pagination}
        pageNum={this.state.pageNum}
        isFetching={this.state.isFetching}
        getNextPage={this.getNextPage}
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
}

export default connect(mapStateToProps, mapActionCreators)(TransactionsContainer)
