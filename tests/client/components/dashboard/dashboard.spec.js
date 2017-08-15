import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Dashboard } from 'routes/client/Dashboard/components/Dashboard';
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

const setUp = () => {

  const chartData = getChartData(privacyRemovalStats, 'Total Removals')
  const pieData = getPieData(privacyRemovalStatus)

  const wrapper = shallow(
    <Dashboard
      keywords={keywords.all}
      user={user}
      chartData={chartData}
      pieData={pieData}
      hasData={true}
      isFetching={false}
      />)

  return {
    wrapper
  }
}

describe('Dashboard Component', () => {
  it('should exist', () => {
    const { wrapper } = setUp()
    expect(wrapper).to.exist;
  })

  it('should receive props', () => {
  })
})
