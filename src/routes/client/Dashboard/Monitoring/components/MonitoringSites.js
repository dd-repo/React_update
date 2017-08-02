import React from 'react';
import _ from 'underscore';
import RootModal from 'components/Modals';

import MonitoringSite from './MonitoringSite';
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

const MonitoringSites = props => {
  const {
    inProgress,
    inQueue,
    potentialRisks,
    handleClick,
    totalCount,
    isFetching
  } = props

  const renderPotentialRisksPanel = (
    !isFetching &&
      <Panel
        type='color-title-border'
        bsStyle='danger'
        background='default'
        header={
          <h4 className='panel-title'>
            Potential Risks
          </h4>
          }
        >
          <Table>
            <thead>
              <tr>
                <th>
                  name of site
                </th>
                <th>
                  records removed
                </th>
                <th>
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {
                potentialRisks.map(
                  site =>
                  <MonitoringSite
                    monitoringSite={site}
                    key={site.id}
                    handleClick={handleClick}
                    showPopover={totalCount < 1 && inProgress < 1}
                  />
                  )
              }
            </tbody>
          </Table>
        </Panel>
  )

  const renderTable = list => (
    <Table>
      <thead>
        <tr>
          <th>
            name of site
          </th>
          <th>
            Date requested
          </th>
          <th>
            records removed
          </th>
        </tr>
      </thead>
      <tbody>
        {
          list.map(
            site =>
            <MonitoringSite
              monitoringSite={site}
              key={site.id}
              handleClick={handleClick}
            />
            )
        }
      </tbody>
    </Table>
  )

  const renderInProgressPanel = (
    !isFetching && inProgress.length > 0 ?
      <Panel
        type='color-title-border'
        bsStyle='info'
        background='default'
        header={
          <h4 className='panel-title'>
            In Progress
          </h4>
          }
          maxHeight={208}
        >
          { renderTable(inProgress) }
        </Panel>
          :
            <div></div>
  )

  const renderInQueuePanel = (
    !isFetching && inQueue.length > 0 ?
      <Panel
        type='color-title-border'
        bsStyle='primary'
        background='default'
        header={
          <h4 className='panel-title'>
            In Queue
          </h4>
          }
          maxHeight={208}
        >
          { renderTable(inQueue) }
        </Panel>
          :
            <div></div>
  )

  const renderCompletedRemovalsPanel = (
    !isFetching &&
      <Panel
        type='color-title-border'
        bsStyle='success'
        background='default'
        header={
          <h4 className='panel-title'>
            Completed
          </h4>
          }
        >
          { renderTable(inProgress) }
        </Panel>
  )

  const renderSummary = (
    !isFetching &&
      <Row className={ classes.summary }>
        <Col md={ 3 } sm={ 3 } xs={ 5 }>
          <Divider>
              In Progress
          </Divider>
          <p className={classes.summaryLargeValue}>
              {inProgress.length}
            <small> Sites</small>
          </p>
        </Col>

        <Col md={ 3 } sm={ 3 } xs={ 5 }>
          <Divider>
              In Queue
          </Divider>
          <p className={classes.summaryLargeValue}>
              {inQueue.length}
            <small> Sites </small>
          </p>
        </Col>

        <Col md={ 3 } sm={ 3 } xs={ 5 }>
          <Divider>
              Potential Risks
          </Divider>
          <p className={classes.summaryLargeValue}>
              {potentialRisks.length}
            <small> Sites</small>
          </p>
        </Col>

        <Col md={ 3 } sm={ 3 } xs={ 5 }>
          <Divider>
              Total Removals
          </Divider>
          <p className={classes.summaryLargeValue}>
              {totalCount}
            <small> Records</small>
          </p>
        </Col>
      </Row>
  )

  const renderLoader = (
    isFetching &&
      <Loader />
  )

  return (
    <div>
      <Row>
        <Col lg={12}>
          <div className={`${classes.mainWrap} 'm-b-3'`}>
            { renderSummary }
          </div>
          <Row>

            <Col lg={inQueue && inQueue.length ? 6 : 12}>
              { renderInProgressPanel }
            </Col>
            <Col lg={6}>
              { renderInQueuePanel }
            </Col>
          </Row>
              { renderPotentialRisksPanel }

            { renderLoader }
        </Col>
      </Row>
      <RootModal />
    </div>
  )
}

export default MonitoringSites;
