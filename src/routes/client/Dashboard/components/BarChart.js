import React from 'react';
import classes from './dashboard.scss';

import {
  Panel,
  Row,
  Col,
  Charts
} from 'components';

const PrivacyRemovalBarChart = ({ chartData }) => (
  <Panel className={ classes.chart }>
    <div className={ classes.boxHeader }>
      <div>
        <h4 className={ classes.boxHeaderTitle }>
          Privacy Removal Statistics
        </h4>
      </div>
    </div>
    <Charts.HighchartBasicColumn className={classes.chartObject} config={ chartData } />
  </Panel>
)

export default PrivacyRemovalBarChart;
