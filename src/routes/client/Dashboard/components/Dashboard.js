import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'recompose';

import SpinnerWhileLoading from 'HOC/SpinnerWhileLoading';
import hideIfNoData from 'HOC/hideIfNoData';
import Keywords from './Keywords';
import CompletedRequests from 'routes/client/Monitoring/components/CompletedRequests';
import DashboardWrapper from './DashboardWrapper';
import Privacy from './Privacy';
import PrivacyReport from './Privacy/Summary';
import GoogleResults from './GoogleResults';
import getFullName from 'utils/fullName';
import capitalize from 'utils/capitalize';
import {
  SCREEN_SIZE_LG,
  SCREEN_SIZE_MD,
  SCREEN_SIZE_SM,
  SCREEN_SIZE_XS
} from 'layouts/DefaultLayout/modules/layout';
import { Row, Col, Overlay, Popover, Divider } from 'components';
import classes from './dashboard.scss';
import RootModal from 'components/Modals';

const withLoader = SpinnerWhileLoading(
  props => props.isFetching
)

class Dashboard extends Component {

  render() {
    const {
      user,
      inProgress,
      inQueue,
      potentialRisks,
      completed,
      totalCount,
      googleResults,
      keywords,
      handleSearch,
      showModal,
      handleKeywordEdit,
      handlePrivacyRemovalButtonClick,
      screenSize,
      driverLicenseNotification
    } = this.props

    const fullName = capitalize(getFullName(user))
    return (
      <div className={classes.mainWrap}>
        <DashboardWrapper screenSize={screenSize}>
          { (widgets, handleStart, handleContinue) => {
            return (
              <div>
                <Row className={ classes.sectionRow }>
                  <Col sm={6} md={6} lg={6}>
                    <div className={classes.container}>
                      <div className={widgets.keywords.overlay}></div>
                      <Keywords
                        styles={widgets.keywords.highlight}
                        active={widgets.keywords.status}
                        handleContinue={handleContinue}
                        keywords={keywords.all}
                        showModal={showModal}
                        handleKeywordEdit={handleKeywordEdit}
                        screenSize={screenSize}
                      />
                    </div>
                    <div className={classes.container}>
                      <div className={widgets.googleResults.overlay}></div>
                      <GoogleResults
                        styles={widgets.googleResults.highlight}
                        active={widgets.googleResults.status}
                        handleContinue={handleContinue}
                        results={googleResults}
                        keywords={keywords}
                        handleSearch={handleSearch}
                        handlePrivacyRemovalButtonClick={handlePrivacyRemovalButtonClick}
                        screenSize={screenSize}
                      />
                    </div>
                  </Col>
                  { screenSize === SCREEN_SIZE_XS && <Divider className='m-t-3 m-b-3'/> }
                  <Col sm={6} md={6} lg={6}>
                    <div className={classes.container}>
                      <div className={widgets.privacyReport.overlay}></div>
                      <PrivacyReport
                        styles={widgets.privacyReport.highlight}
                        active={widgets.privacyReport.status}
                        handleContinue={handleContinue}
                        inProgressCount={inProgress.length}
                        inQueueCount={inQueue.length}
                        potentialRiskCount={potentialRisks.length}
                        totalRemovalCount={totalCount}
                        screenSize={screenSize}
                      />
                    </div>
                    <div className={classes.container}>
                      <div className={widgets.privacyRemovals.overlay}></div>
                      <Privacy
                        styles={widgets.privacyRemovals.highlight}
                        active={widgets.privacyRemovals.status}
                        handleContinue={handleContinue}
                        inProgress={inProgress}
                        inQueue={inQueue}
                        potentialRisks={potentialRisks}
                        completed={completed}
                        screenSize={screenSize}
                        driverLicenseNotification={driverLicenseNotification}
                      />
                    </div>
                  </Col>
                </Row>
                <RootModal handleClick={handleStart} />
              </div>
              )}}
            </DashboardWrapper>
          </div>
    )
  }
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  inProgress: PropTypes.array,
  inQueue: PropTypes.array,
  potentialRisks: PropTypes.array,
  completedRequests: PropTypes.array,
  googleResults: PropTypes.array,
  keywords: PropTypes.object.isRequired,
  handleKeywordEdit: PropTypes.func.isRequired,
  handleSearch: PropTypes.func,
  handlePrivacyRemovalButtonClick: PropTypes.func,
  isFetching: PropTypes.bool.isRequired,
}

export default compose(withLoader)(Dashboard);
