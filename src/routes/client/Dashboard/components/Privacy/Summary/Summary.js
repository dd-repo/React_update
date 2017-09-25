import React from 'react';
import classes from '../privacy.scss';
import SummaryResult from 'routes/client/Monitoring/components/SummaryResult';
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
    <div className={`${classes.mainWrap} 'm-b-3'`}>
      <Row className={ classes.summary }>
        <Col md={ 6 } sm={ 6 } xs={ 5 }>
          <SummaryResult
            title='in progress'
            count={inProgressCount}
          />
        </Col>
        <Col md={ 6 } sm={ 6 } xs={ 5 }>
          <SummaryResult
            title='in queue'
            count={inQueueCount}
          />
        </Col>
      </Row>
      <Row className={ classes.summary }>
        <Col md={ 6 } sm={ 6 } xs={ 5 }>
          <SummaryResult
            title='potential risks'
            count={potentialRiskCount}
          />
        </Col>

        <Col md={ 6 } sm={ 6 } xs={ 5 }>
          <SummaryResult
            title='total removals'
            count={totalRemovalCount}
            label='Records'
          />
        </Col>
      </Row>
    </div>
)

export default Summary;

