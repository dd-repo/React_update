import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'components';
import classes from './Monitoring.scss';

const SummaryResult = props => (
  <div>
    <Divider textPosition="center" className={classes.summaryResultTitle}>
      { props.title }
    </Divider>
    <p className={classes.summaryLargeValue}>
      {props.count}
      <small> {props.label}</small>
    </p>
  </div>
)

SummaryResult.defaultProps = {
  count: 0,
  label: 'Sites'
}

SummaryResult.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  label: PropTypes.string
}

export default SummaryResult;


