import React from 'react';

import classes from '../dashboard.scss';
import {
  Panel,
  Row,
  Col,
  Charts
} from 'components';

const getConfig = data => {
  let colorSequence = [
    '#2E9BDA',
    '#3BBDA8',
    '#CB3E4B',
    '#A072FC'
  ];

  let pieData = data.map((entry, index) => ({
    name: entry.name,
    y: entry.value,
    color: colorSequence[index]
  }))

  return {
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
      pieData
    }]
  }
};

const PrivacyRemovalPieChart = ({ data }) => (
  <Panel className={classes.chart}>
    <div className={ classes.boxHeader}>
      <h4 className={classes.boxHeaderTitle}>Requested Removal Status</h4>
    </div>
    <Charts.HighchartBasicPie config={ getConfig(data) } />
  </Panel>
)

export default PrivacyRemovalPieChart;
