import React from 'react';
import { connect, RoutedComponent } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import { fetchPrivacyRemovalStatistics } from './modules/privacyRemovalStats';
import { fetchPrivacyRemovalStatus } from './modules/privacyRemovalStatus';
import { fetchMonitoringRequestsCompleted } from 'routes/client/Monitoring/modules/monitoring';
import { fetchGoogleResults } from 'routes/client/GoogleResults/modules/googleResults';
import { updateCurrentKeyword } from 'routes/signup/Keywords/modules/keywords';
import Dashboard from './components/Dashboard';
import GettingStarted from './components/GettingStarted';

const getChartData = (data, name) => {
  return {
    xAxis: {
      categories: data.map(entry => entry.site)
    },
    yAxis: {
      allowDecimals: false
    },
    series: [{
      name: name,
      data: data.map(entry => entry.value)
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
      height: 405
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
    this.state = {
      isFetching: true,
      hasData: false
    }

    this.fetchDashboardData = this.fetchDashboardData.bind(this);
    this.fetchLastFiveCompletedRemovals = this.fetchLastFiveCompletedRemovals.bind(this);
    this.fetchFirstPageGoogleResults = this.fetchFirstPageGoogleResults.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePrivacyRemovalButtonClick = this.handlePrivacyRemovalButtonClick.bind(this);
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
    .then( res => this.hasData())
    .catch( error => console.log('dashboard error', error))
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.keywords) {
      if(nextProps.keywords.currentKeyword !== this.props.keywords.currentKeyword) {
        this.fetchFirstPageGoogleResults(this.props.user.account_id, nextProps.keywords.currentKeyword.id)
      }
    }
  }

  hasData() {
    this.setState({ isFetching: false, hasData: this.props.hasData })
  }

  fetchDashboardData(account_id, keyword_id) {
    return Promise.all([
      this.props.fetchPrivacyRemovalStatistics(account_id),
      this.props.fetchPrivacyRemovalStatus(account_id),
      this.fetchFirstPageGoogleResults(account_id, keyword_id),
      this.fetchLastFiveCompletedRemovals(account_id),
    ])
  }

  fetchLastFiveCompletedRemovals(id) {
    const params = {
      q: {
        completed_at_not_null: '1',
        s: 'completed_at desc',
        monitoring_request_account_id_eq: id,
        limit: 5
      }
    }
    this.props.fetchMonitoringRequestsCompleted(params)
  }

  fetchFirstPageGoogleResults(account_id, keyword_id) {
    const payload = { account_id, keyword_id }
    this.props.fetchGoogleResults(payload)
  }

  handleSearch(keyword) {
    this.props.updateCurrentKeyword(keyword.value)
  }

  handlePrivacyRemovalButtonClick(id, selector) {
    if(selector === 'removal') {
      const payload = { request: { search_result_id: id }}
      this.props.requestRemoval(payload)
      .then( (res) => this.showAlertMessage())
      .catch( (error) => this.showAlertMessage())
    }else{
      this.context.router.push('/dashboard/privacy')
    }
  }

  render() {
    const chartData = getChartData(this.props.privacyRemovalStats, 'Total Removals')
    const pieData = getPieData(this.props.privacyRemovalStatus)

    return (
      <div>
        <Dashboard
          user={this.props.user}
          chartData={chartData}
          pieData={pieData}
          completedRequests={this.props.completedRemovals || []}
          googleResults={this.props.googleResults || []}
          keywords={this.props.keywords}
          handleSearch={this.handleSearch}
          handlePrivacyRemovalButtonClick={this.handlePrivacyRemovalButtonClick}
          isFetching={this.state.isFetching}
          hasData={this.props.hasData}
        />
        <GettingStarted
          user={this.props.user}
          isFetching={this.state.isFetching}
          hasData={this.props.hasData}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.currentUser,
  privacyRemovalStats: state.dashboard.privacyRemovalStats,
  privacyRemovalStatus: state.dashboard.privacyRemovalStatus,
  completedRemovals: state.monitoring.completed,
  googleResults: state.googleResults.all,
  hasData: state.dashboard.hasData,
  keywords: state.keywords
})

const mapActionCreators = {
  fetchMonitoringRequestsCompleted,
  fetchPrivacyRemovalStatistics,
  fetchPrivacyRemovalStatus,
  updateCurrentKeyword,
  fetchGoogleResults
}

export default connect(mapStateToProps, mapActionCreators)(DashboardContainer)
