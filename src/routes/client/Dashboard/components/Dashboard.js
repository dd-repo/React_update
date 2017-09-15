import React, { PropTypes } from 'react';
import { compose } from 'recompose';

import SpinnerWhileLoading from 'HOC/SpinnerWhileLoading';
import hideIfNoData from 'HOC/hideIfNoData';
import Keywords from './Keywords';
import CompletedRequests from 'routes/client/Monitoring/components/CompletedRequests';
import Privacy from './Privacy';
import PrivacySummary from './Privacy/Summary';
import GoogleResults from './GoogleResults';
import getFullName from 'utils/fullName';
import capitalize from 'utils/capitalize';
import {
  Row,
  Col,
  Panel,
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
  Tooltip,
  Button,
  PageHeader
} from 'components';
import { Colors } from 'consts';
import classes from './dashboard.scss';
import RootModal from 'components/Modals';

const withLoader = SpinnerWhileLoading(
  props => props.isFetching
)

export const Dashboard = (props) => {
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
    handlePrivacyRemovalButtonClick
  } = props

  const fullName = capitalize(getFullName(user))
  return (
    <div className={classes.mainWrap}>
      <Row className={ classes.sectionRow }>
        <Col lg={6}>
          <Keywords
            keywords={keywords.all}
            showModal={showModal}
            handleKeywordEdit={handleKeywordEdit}
          />
        </Col>
        <Col lg={6}>
          <ListGroup>
            <ListGroupItem className='text-white' style={{background: Colors.brandDanger}}>
              Your Privacy Removal Report
              <OverlayTrigger
                placement='top'
                overlay={(
                  <Tooltip>
                    info
                  </Tooltip>
                  )}
                >
                  <Button
                    className={classes.infoButton}
                    bsStyle='link'
                  >
                    <i className='fa fa-question fa-fw fa-lg text-white'></i>
                  </Button>
                </OverlayTrigger>
              </ListGroupItem>
              <ListGroupItem style={{background: 'none'}}>
                <PrivacySummary
                  inProgressCount={inProgress.length}
                  inQueueCount={inQueue.length}
                  potentialRiskCount={potentialRisks.length}
                  totalRemovalCount={totalCount}
                />
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
        <Row className={ classes.sectionRow }>
          <Col md={ 6 }>
            <GoogleResults
              results={googleResults}
              keywords={keywords}
              handleSearch={handleSearch}
              handlePrivacyRemovalButtonClick={handlePrivacyRemovalButtonClick}
            />
          </Col>
          <Col md={ 6 }>
            <Privacy
              inProgress={inProgress}
              inQueue={inQueue}
              potentialRisks={potentialRisks}
              completed={completed}
            />
          </Col>
          <RootModal />
        </Row>
      </div>
  )
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
