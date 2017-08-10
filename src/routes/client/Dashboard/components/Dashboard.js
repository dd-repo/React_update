import React from 'react';

import KeywordSummary from './KeywordSummary';
import PrivacyRemovalBarChart from './BarChart';
import PrivacyRemovalPieChart from './PieChart';
import CompletedRequests from 'routes/client/Monitoring/components/CompletedRequests';
import ClientDetails from './ClientDetails';
import GoogleResults from './GoogleResults';
import classes from './dashboard.scss';
import getFullName from 'utils/fullName';
import capitalize from 'utils/capitalize';
import { Row, Col, Panel, PageHeader } from 'components';

const Dashboard = props => {
  const {
    user,
    chartData,
    pieData,
    completedRequests,
    googleResults,
    keywords,
    handleSearch,
    handlePrivacyRemovalButtonClick,
    clientDetails
  } = props

  const fullName = getFullName(user)

  return (
    <div className={classes.mainWrap}>
      <Row>
        <Col md={ 12 }>
          <div>
            <PageHeader>
              Welcome <small className='text-gray-lighter'>{capitalize(fullName)}</small>
            </PageHeader>
          </div>
        </Col>
      </Row>
          <KeywordSummary keywords={keywords.all} />
      <Row className={ classes.sectionRow }>
        <Col md={ 8 }>
          <PrivacyRemovalBarChart chartData={chartData} />
        </Col>
        <Col md={ 4 }>
          <PrivacyRemovalPieChart pieData={pieData} />
        </Col>
      </Row>
      <Row className={ classes.sectionRow }>
        <Col md={ 6 }>
          <CompletedRequests
            completed={completedRequests}
            title='Most Recent Removals'
          />
        </Col>
        <Col md={ 6 }>
          <GoogleResults
            results={googleResults}
            keywords={keywords}
            handleSearch={handleSearch}
            handlePrivacyRemovalButtonClick={handlePrivacyRemovalButtonClick}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard;
