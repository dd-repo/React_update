import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { default as MainDashboardWrapper, Dashboard } from 'routes/client/Dashboard/components/Dashboard';
import KeywordSummary from 'routes/client/Dashboard/components/KeywordSummary';
import PrivacyRemovalBarChart from 'routes/client/Dashboard/components/BarChart';
import PrivacyRemovalPieChart from 'routes/client/Dashboard/components/PieChart';
import CompletedRequests from 'routes/client/Monitoring/components/CompletedRequests';
import GoogleResults from 'routes/client/Dashboard/components/GoogleResults';
import { PageHeader, Loader } from 'components';
import {
  keywords,
  user,
  googleResults,
  completedRequests,
  privacyRemovalStats,
  privacyRemovalStatus
} from '../../../helpers';

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

const chartData = getChartData(privacyRemovalStats, 'Total Removals')
const pieData = getPieData(privacyRemovalStatus)

const setUp = () => {

  const wrapper = shallow(
    <Dashboard
      keywords={keywords.all}
      user={user}
      chartData={chartData}
      pieData={pieData}
      hasData={true}
      isFetching={false}
      />)

  const whileLoadingWrapper = mount(
    <MainDashboardWrapper
      keywords={keywords.all}
      user={user}
      chartData={chartData}
      pieData={pieData}
      hasData={true}
      isFetching={true}
      />)

  return {
    wrapper,
    MainDashboardWrapper
  }
}

describe('Dashboard Component', () => {
  const { wrapper } = setUp()

  it('should exist', () => {
    expect(wrapper).to.exist;
  })

  it('should render one PageHeader', () => {
    expect(wrapper.find(PageHeader)).to.have.length(1)
  })

  it('should render a Welcome with client name', () => {
    expect(wrapper.find(PageHeader).html()).includes('<h1>Welcome <small class="text-gray-lighter">First Last</small></h1>')
  })

  it('should render one KeywordSummary', () => {
    expect(wrapper.find(KeywordSummary)).to.have.length(1)
  })

  it('should render one PrivacyRemovalBarChart', () => {
    expect(wrapper.find(PrivacyRemovalBarChart)).to.have.length(1)
  })

  it('should render one PrivacyRemovalPieChart', () => {
    expect(wrapper.find(PrivacyRemovalPieChart)).to.have.length(1)
  })

  it('should render one CompletedRequests', () => {
    expect(wrapper.find(CompletedRequests)).to.have.length(1)
  })

  it('should render one GoogleResults', () => {
    expect(wrapper.find(GoogleResults)).to.have.length(1)
  })

  describe('Dashboard Props', () => {
    const props = wrapper.instance().props

    it('should receive keyword prop', () => {
      expect(props.keywords).to.equal(keywords.all)
    })

    it('should receive user prop', () => {
      expect(props.user).to.equal(user)
    })

    it('should receive chartData prop', () => {
      expect(props.chartData).to.equal(chartData)
    })

    it('should receive pieData prop', () => {
      expect(props.pieData).to.equal(pieData)
    })

    it('should receive hasData prop', () => {
      expect(props.hasData).to.equal(true)
    })

    it('should receive isFetching prop', () => {
      expect(props.isFetching).to.equal(false)
    })
  })
})
