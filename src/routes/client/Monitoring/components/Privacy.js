import React from 'react';
import _ from 'underscore';

import RootModal from 'components/Modals';
import MonitoringRequests from './MonitoringRequests';
import PotentialRisks from './MonitoringSites';
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
    handleRemovalRequest,
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
                    className='in-progress'
                  />
                </Col>
                <Col lg={6}>
                  <MonitoringRequests
                    requests={inQueue}
                    style='info'
                    header='In Queue'
                    className='in-queue'
                  />
                </Col>
              </Row>

              <Panel
                type='color-title-border'
                bsStyle='danger'
                background='default'
                className='potential-risks'
                header={
                  <h4 className='panel-title'>
                    Potential Risks
                  </h4>
                }
              >
                <PotentialRisks
                  potentialRisks={potentialRisks}
                  isFetching={isFetching}
                />
              </Panel>

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
