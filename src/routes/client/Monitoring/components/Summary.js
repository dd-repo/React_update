import React from 'react';
import classes from './Monitoring.scss';
import SummaryResult from './SummaryResult';
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
        <SummaryResult
          title='in progress'
          count={inProgressCount}
        />
      </Col>
      <Col md={ 3 } sm={ 3 } xs={ 5 }>
        <SummaryResult
          title='in queue'
          count={inQueueCount}
        />
      </Col>
      <Col md={ 3 } sm={ 3 } xs={ 5 }>
        <SummaryResult
          title='potential risks'
          count={potentialRiskCount}
        />
      </Col>
      <Col md={ 3 } sm={ 3 } xs={ 5 }>
        <SummaryResult
          title='total removals'
          count={totalRemovalCount}
          label='Records'
        />
      </Col>
    </Row>
)

export default Summary;
