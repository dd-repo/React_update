import React from 'react';
import { connect, RoutedComponent } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import { fetchGoogleResults } from 'routes/client/GoogleResults/modules/googleResults';
import { updateKeyword, updateCurrentKeyword } from 'routes/client/Account/modules/keywords';
import { showModal, hideModal } from 'modules/modal';
import Dashboard from './components/Dashboard';
import {
  fetchMonitoringRequestsCompleted,
  fetchMonitoringRequests,
  monitoringRequestRemoval
} from 'routes/client/Monitoring/modules/monitoring';

class DashboardContainer extends RoutedComponent {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { isFetching: true }
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

  componentWillMount() {
    const accountId = this.props.user.account_id
    const keyword_id = this.props.keywords.currentKeyword.id

    this.fetchDashboardData(accountId, keyword_id)
    .then( res => this.setState({ isFetching: false }))
    .catch( error => console.log('dashboard error', error))
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.keywords) {
      if(nextProps.keywords.currentKeyword !== this.props.keywords.currentKeyword) {
        this.fetchFirstPageGoogleResults(this.props.user.account_id, nextProps.keywords.currentKeyword.id)
      }
    }
  }

  fetchDashboardData = (account_id, keyword_id) => {
    return Promise.all([
      this.fetchFirstPageGoogleResults(account_id, keyword_id),
      this.fetchMonitoringRequests(account_id),
      this.fetchMonitoringCompleted(account_id)
    ])
  }

  fetchMonitoringRequests = (id) => {
    this.props.fetchMonitoringRequests(id)
  }

  fetchMonitoringCompleted = (id) => {
    const params = {
      q: {
        completed_at_not_null: '1',
        s: 'completed_at desc',
        monitoring_request_account_id_eq: id
      }
    }
    this.props.fetchMonitoringRequestsCompleted(params)
  }

  fetchFirstPageGoogleResults = (account_id, keyword_id) => {
    const payload = { account_id, keyword_id }
    this.props.fetchGoogleResults(payload)
  }

  handleSearch = (keyword) => {
    this.props.updateCurrentKeyword(keyword)
  }

  handlePrivacyRemovalButtonClick = (id, selector) => {
    if(selector === 'removal') {
      const payload = { request: { search_result_id: id }}
      this.props.requestRemoval(payload)
      .then( (res) => this.showAlertMessage())
      .catch( (error) => this.showAlertMessage())
    }else{
      this.context.router.push('/dashboard/privacy')
    }
  }

  handleKeywordEdit = keyword => {
    this.props.updateKeyword(keyword, this.props.user.account_id)
    this.props.hideModal()
  }

  render() {

    return (
      <div>
        <Dashboard
          user={this.props.user}
          isFetching={this.state.isFetching}
          inProgress={this.props.inProgress}
          inQueue={this.props.inQueue}
          potentialRisks={this.props.potentialRisks}
          completed={this.props.completed}
          totalCount={this.props.totalCount}
          googleResults={this.props.googleResults}
          keywords={this.props.keywords}
          handlePrivacyRemovalButtonClick={this.handlePrivacyRemovalButtonClick}
          handleKeywordEdit={this.handleKeywordEdit}
          handleSearch={this.handleSearch}
          showModal={this.props.showModal}
          screenSize={this.props.screenSize}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.currentUser,
  inProgress: state.monitoring.inProgress,
  inQueue: state.monitoring.inQueue,
  potentialRisks: state.monitoring.potentialRisks,
  completed: state.monitoring.completed,
  totalCount: state.monitoring.totalCount,
  googleResults: state.googleResults.all,
  keywords: state.account.keywords,
  screenSize: state.layout.currentScreenSize
})

const mapActionCreators = {
  fetchMonitoringRequestsCompleted,
  fetchMonitoringRequests,
  monitoringRequestRemoval,
  updateCurrentKeyword,
  fetchGoogleResults,
  updateKeyword,
  hideModal,
  showModal
}

export default connect(mapStateToProps, mapActionCreators)(DashboardContainer)
