import React from 'react';
import _ from 'underscore';

import RootModal from 'components/Modals';
import MonitoringRequests from './MonitoringRequests';
import MonitoringSites from './MonitoringSites';
import MonitoringSite from './MonitoringSite';
import Summary from './Summary';
import CompletedRequests from './CompletedRequests';
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
import classes from './Monitoring.scss';

const Privacy = props => {
  const {
    inProgress,
    inQueue,
    potentialRisks,
    handleClick,
    totalCount,
    completed,
    isFetching
  } = props


  const renderLoader = (
    isFetching &&
      <Loader />
  )

  return (
    <div>
      {
        !isFetching ?
          <Row>
            <Col lg={12}>
              <div className={`${classes.mainWrap} 'm-b-3'`}>
                <Summary
                  inProgressCount={inProgress.length}
                  inQueueCount={inQueue.length}
                  potentialRiskCount={potentialRisks.length}
                  totalRemovalCount={totalCount}
                />
              </div>
              <Row>

                <Col lg={inQueue && inQueue.length ? 6 : 12}>
                  <MonitoringRequests
                    requests={inProgress}
                    style='primary'
                    header='In Progress'
                  />
                </Col>
                <Col lg={6}>
                  <MonitoringRequests
                    requests={inQueue}
                    style='info'
                    header='In Queue'
                  />
                </Col>
              </Row>

              <MonitoringSites
                sites={potentialRisks}
                handleClick={handleClick}
                isFetching={isFetching}
              />

            <CompletedRequests
              completed={completed}
              maxHeight={304}
              type='color-border-full'
              bsStyle='success'
              title='Completed Removals'
            />

        </Col>
        <RootModal />
      </Row>
      :
        <div>
          { renderLoader }
        </div>
        }
      </div>
  )
}

export default Privacy;
