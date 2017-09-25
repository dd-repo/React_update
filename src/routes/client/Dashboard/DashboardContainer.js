import React from 'react';
import { connect, RoutedComponent } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import { fetchPrivacyRemovalStatus } from './modules/privacyRemovalStatus';
import { fetchGoogleResults } from 'routes/client/GoogleResults/modules/googleResults';
import { updateKeyword, updateCurrentKeyword } from 'routes/client/Account/modules/keywords';
import { showModal, hideModal } from 'modules/modal';
import Dashboard from './components/Dashboard';
import {
  MONITORING_UPDATE_SUCCESS,
  MONITORING_UPDATE_FAILURE,
  fetchMonitoringRequestsCompleted,
  fetchMonitoringRequests,
  monitoringRequestRemoval
} from 'routes/client/Monitoring/modules/monitoring';

const hasRemovals = data => {
  const result = data.reduce((sum, obj) => (
      sum + obj.value
  ), 0)
  return result > 0
}

const getChartData = (data, name) => {
  const chartData = hasRemovals(data) ? data : fakeRemovalStatistics
  return {
    xAxis: {
      categories: chartData.map(entry => entry.site)
    },
    yAxis: {
      allowDecimals: false
    },
    chart: {
      height: 300
    },
    series: [{
      name: name,
      data: chartData.map(entry => entry.value)
    }]
  }
}

const getPieData = data => {
  const colorSequence = [
    '#2E9BDA',
    '#3BBDA8',
    '#CB3E4B',
    '#A072FC'
  ];

  const pieData = data.map((entry, index) => ({
    name: entry.name,
    y: entry.value,
    color: colorSequence[index]
  }))
  return getPieChartConfig(pieData)
}

const getPieChartConfig = (data) => (
  {
    chart: {
      height: 300
    },
    legend: {
      enabled: true,
      align: 'middle',
      verticalAlign: 'bottom',
      layout: 'vertical',
    },
    tooltip: {
      shared: true,
      useHTML: true,
      pointFormat: '<h5>{point.y}</h5>',
    },
    series: [{
      name: 'Value',
      data
    }]
  }
);

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
      headerEnabled: true
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
      this.props.fetchPrivacyRemovalStatus(account_id),
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
  keywords: state.account.keywords
})

const mapActionCreators = {
  fetchMonitoringRequestsCompleted,
  fetchPrivacyRemovalStatus,
  fetchMonitoringRequests,
  monitoringRequestRemoval,
  updateCurrentKeyword,
  fetchGoogleResults,
  updateKeyword,
  hideModal,
  showModal
}

export default connect(mapStateToProps, mapActionCreators)(DashboardContainer)
