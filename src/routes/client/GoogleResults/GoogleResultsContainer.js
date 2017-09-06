import React from 'react';
import _ from 'underscore';

import { RoutedComponent, connect } from 'routes/routedComponent';
import GoogleResults from './components/GoogleResults';
import { getMonitoring } from '../Monitoring/modules/monitoring';
import { fetchGoogleResults, requestRemoval } from './modules/googleResults';
import { updateCurrentKeyword } from 'routes/client/Account/modules/keywords';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';

class GoogleResultsContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = { pageNum: 1 }

    this.getResults = this.getResults.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
    this.handleRemoval = this.handleRemoval.bind(this);
    this.showAlertMessage = this.showAlertMessage.bind(this);
    this.hideAlertMessage = this.hideAlertMessage.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const searchTerm = this.props.keywords.currentKeyword || this.props.keywords.all[0]
    this.getResults(searchTerm)
  }

  getLayoutOptions() {
    return {
      contentView: CONTENT_VIEW_STATIC,
      sidebarEnabled: true,
      navbarEnabled: true,
      footerEnabled: true,
      headerEnabled: true
    }
  }

  getNextPage(pageNum) {
    this.getResults(this.props.keywords.currentKeyword, pageNum)
  }

  handleRemoval(id, selector) {
    if(selector === 'removal') {
      const payload = { request: { search_result_id: id }}
      this.props.requestRemoval(payload)
      .then( (res) => this.showAlertMessage())
      .catch( (error) => this.showAlertMessage())
    }else{
      this.context.router.push('/dashboard/privacy')
    }
  }

  showAlertMessage() {
    this.setState({showModal: true})
  }

  hideAlertMessage() {
    this.setState({showModal: false})
  }

  getResults(keyword, pageNum=1) {
    const { account_id } = this.props.currentUser
    const keyword_id = keyword.id
    const payload = { pageNum, keyword_id, account_id }
    this.props.updateCurrentKeyword(keyword)
    this.props.fetchGoogleResults(payload);
    this.setState({ pageNum: parseInt(pageNum) })
  }

  componentWillReceiveProps(nextProps) {
    !nextProps.googleResults.isFetching &&
      setTimeout(() => this.setState({isFetching: false}), 1500)
  }

  render() {
    const { pagination } = this.props.googleResults

    const paginationItems = (
      pagination &&
        Math.ceil( pagination.total / pagination.limit )
    )

    const paginationTotal = (
      pagination &&
        pagination.total
    )

    const sortedResults = (
      _.sortBy(this.props.googleResults.all, 'rank')
    )

    return (
        <GoogleResults
          results={sortedResults}
          paginationItems={paginationItems}
          paginationTotal={paginationTotal}
          keywords={this.props.keywords}
          currentKeyword={this.props.keywords.currentKeyword}
          isFetching={this.props.googleResults.isFetching}
          getResults={this.getResults}
          getNextPage={this.getNextPage}
          pageNum={this.state.pageNum}
          handleRemoval={this.handleRemoval}
          showModal={this.state.showModal}
          hideModal={this.hideAlertMessage}
        />
    )
  }
}

const mapStateToProps = state => {
  return {
    googleResults: state.googleResults,
    currentUser: state.currentUser,
    keywords: state.account.keywords
  }
}

const mapActionCreators = {
  fetchGoogleResults,
  updateCurrentKeyword,
  requestRemoval
}

export default connect(mapStateToProps, mapActionCreators)(GoogleResultsContainer);
