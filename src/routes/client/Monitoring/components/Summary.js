import React from 'react';
import classes from './Monitoring.scss';
import {
  Panel,
  Table,
  Row,
  Col,
  Label,
  Button,
  Divider,
  Loader
} from 'components';


const Summary = ({
  isFetching,
  inProgressCount,
  inQueueCount,
  potentialRiskCount,
  totalRemovalCount
}) => (
  !isFetching &&
    <Row className={ classes.summary }>
      <Col md={ 3 } sm={ 3 } xs={ 5 }>
        <Divider>
          In Progress
        </Divider>
        <p className={classes.summaryLargeValue}>
          {inProgressCount}
          <small> Sites</small>
        </p>
      </Col>

      <Col md={ 3 } sm={ 3 } xs={ 5 }>
        <Divider>
          In Queue
        </Divider>
        <p className={classes.summaryLargeValue}>
          {inQueueCount}
          <small> Sites </small>
        </p>
      </Col>

      <Col md={ 3 } sm={ 3 } xs={ 5 }>
        <Divider>
          Potential Risks
        </Divider>
        <p className={classes.summaryLargeValue}>
          {potentialRiskCount}
          <small> Sites</small>
        </p>
      </Col>

      <Col md={ 3 } sm={ 3 } xs={ 5 }>
        <Divider>
          Total Removals
        </Divider>
        <p className={classes.summaryLargeValue}>
          {totalRemovalCount}
          <small> Records</small>
        </p>
      </Col>
    </Row>
)

export default Summary;
