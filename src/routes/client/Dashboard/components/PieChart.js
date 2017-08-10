import React from 'react';

import classes from './dashboard.scss';
import {
  Panel,
  Row,
  Col,
  Charts
} from 'components';

const PrivacyRemovalPieChart = ({ pieData }) => (
  <Panel className={classes.chart}>
    <div className={ classes.boxHeader}>
      <h4 className={classes.boxHeaderTitle}>Requested Removal Status</h4>
    </div>
    <Charts.HighchartBasicPie config={ pieData } />
  </Panel>
)

export default PrivacyRemovalPieChart;
