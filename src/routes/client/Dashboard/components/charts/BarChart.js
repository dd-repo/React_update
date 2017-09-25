import React from 'react';
import classes from './dashboard.scss';

import {
  Panel,
  Row,
  Col,
  Charts
} from 'components';

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

const PrivacyRemovalBarChart = ({ data }) => (
  <Panel className={ classes.chart }>
    <div className={ classes.boxHeader }>
      <div>
        <h4 className={ classes.boxHeaderTitle }>
          Privacy Removal Statistics
        </h4>
      </div>
    </div>
    <Charts.HighchartBasicColumn className={classes.chartObject} config={ getChartConfig(Data) } />
  </Panel>
)

export default PrivacyRemovalBarChart;
