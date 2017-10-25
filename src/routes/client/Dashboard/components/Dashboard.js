import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'recompose';

import SpinnerWhileLoading from 'HOC/SpinnerWhileLoading';
import hideIfNoData from 'HOC/hideIfNoData';
import Keywords from './Keywords';
import CompletedRequests from 'routes/client/Monitoring/components/CompletedRequests';
import DashboardWrapper from './DashboardWrapper';
import PrivacyRemovals from './Privacy';
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
import DashboardPopover from './DashboardPopover';

const withLoader = SpinnerWhileLoading(
  props => props.isFetching
)

class Dashboard extends Component {

  render() {
    const {
      account,
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

    const fullName = capitalize(getFullName(account))
    return (
      <div className={classes.mainWrap}>
        <DashboardWrapper signInCount={account.sign_in_count} screenSize={screenSize}>
          { ( props, handleContinue, handleExitTutorial ) => {
            return (
              <div>
                { props.isActive &&
                  <DashboardPopover
                    active={props.isActive}
                    configs={props[props.activeWidget]}
                    nodeRef={this[props.activeWidget]}
                    handleClick={handleContinue}
                    handleExit={handleExitTutorial}
                  />
                  }
                <Row className={ classes.sectionRow }>
                  <Col sm={6} md={6} lg={6}>
                    <div className={classes.container}>
                      <div className={!props.keywords.active && classes.overlay}></div>
                      <Keywords
                        tutorialIsActive={props.isActive}
                        ref={ ref => this.keywords = ref }
                        configs={props.keywords}
                        keywords={keywords.all}
                        showModal={showModal}
                        handleKeywordEdit={handleKeywordEdit}
                        screenSize={screenSize}
                      />
                    </div>
                    <div className={classes.container}>
                      <div className={!props.googleResults.active && classes.overlay}></div>
                      <GoogleResults
                        tutorialIsActive={props.isActive}
                        ref={ ref => this.googleResults = ref }
                        configs={props.googleResults}
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
                      <div className={!props.privacyReport.active && classes.overlay}></div>
                      <PrivacyReport
                        tutorialIsActive={props.isActive}
                        ref={ ref => this.privacyReport = ref }
                        configs={props.privacyReport}
                        inProgressCount={inProgress.length}
                        inQueueCount={inQueue.length}
                        potentialRiskCount={potentialRisks.length}
                        totalRemovalCount={totalCount}
                        screenSize={screenSize}
                      />
                    </div>
                    <div className={classes.container}>
                      <div className={!props.privacyRemovals.active && classes.overlay}></div>
                      <PrivacyRemovals
                        tutorialIsActive={props.isActive}
                        ref={ ref => this.privacyRemovals = ref }
                        configs={props.privacyRemovals}
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
              </div>
              )}}
            </DashboardWrapper>
          </div>
    )
  }
}

Dashboard.defaultProps = {
  account: {},
  inProgress: [],
  inQueue: [],
  potentialRisks: [],
  completedRequests: [],
  googleResults: [],
  keywords: {}
}

Dashboard.propTypes = {
  account: PropTypes.object,
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
