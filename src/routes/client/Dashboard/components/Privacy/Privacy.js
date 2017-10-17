import React, { Component } from 'react';
import { connect } from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';

import RequestedRemovals from 'routes/client/Monitoring/components/MonitoringRequests';
import InProgress from './InProgress';
import InQueue from './InQueue/InQueue';
import PrivacyRemovals from './PrivacyRemovals/PrivacyRemovals';
import CompletedRemovals from './CompletedRemovals';
import Documents from 'routes/client/Account/components/Documents';
import { requestRemoval } from 'routes/client/Monitoring/modules/monitoring';
import PopoverGuide from '../PopoverGuide';
import {
  SCREEN_SIZE_LG,
  SCREEN_SIZE_MD,
  SCREEN_SIZE_SM,
  SCREEN_SIZE_XS
} from 'layouts/DefaultLayout/modules/layout';
import {
    Tabs,
    Tab,
    Nav,
    NavItem,
    ScrollBarContainer
} from 'components';

const description = "This is a list of sites which are notorious for spreading your private information around the web. You can request removal of your information from any or all of these sites. As soon as you click “Request Removal,” your request will enter your queue, and our team of experts will get to work protecting your privacy."

class Privacy extends Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.active) {
      switch(this.props.screenSize) {
        case SCREEN_SIZE_XS:
          scrollToComponent(this.nodeRef, { offset: -300, align:'middle', duration: 1000})
          break;
        case SCREEN_SIZE_SM:
          scrollToComponent(this.nodeRef, { offset: 0, align:'middle', duration: 1000})
          break;
        case SCREEN_SIZE_MD:
          scrollToComponent(this.nodeRef, { offset: 200, align:'bottom', duration: 1000})
          break;
      }
    }
  }

  handleRemovalRequest = removalId => {
    this.props.dispatch(requestRemoval(removalId))
  }

  render() {
    const {
      active,
      styles,
      handleContinue,
      inProgress,
      inQueue,
      potentialRisks,
      completed,
      screenSize
    } = this.props

    const defaultTab = inProgress.length > 0 ? 'inProgress' : 'potentialThreats'

    return (
      <div className={styles}
        ref={ node => this.nodeRef = node }
      >
        <PopoverGuide
          active={active}
          description={description}
          title='Privacy Removals'
          placement='top'
          nodeRef={this.nodeRef}
          handleContinue={handleContinue}
        />
        <Tab.Container id="profile-tabs" defaultActiveKey={defaultTab} animation>
          <div>
            <Nav bsStyle='tabs'>
              <NavItem eventKey='inProgress'>
                In Progress
              </NavItem>
              <NavItem eventKey='completed'>
                Completed
              </NavItem>
              <NavItem  ref={ tab => this.tabRef = tab } eventKey='potentialThreats'>
                Potential Threats
              </NavItem>
              <NavItem eventKey='inQueue'>
                In Queue
              </NavItem>
              <NavItem eventKey='documents'>
                Documents
              </NavItem>
            </Nav>
            <ScrollBarContainer
              style={{ maxHeight: screenSize === SCREEN_SIZE_LG ? '500px' : '300px' }}
            >
              <Tab.Content animation>
                <Tab.Pane eventKey='inProgress'>
                  <InProgress
                    requests={inProgress}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey='completed'>
                  <CompletedRemovals
                    completed={completed}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey='potentialThreats'>
                  <PrivacyRemovals
                    privacyRemovals={potentialRisks}
                    handleRemovalRequest={this.handleRemovalRequest}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey='inQueue'>
                  <InQueue
                    inQueue={inQueue}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey='documents'>
                  <Documents />
                </Tab.Pane>
              </Tab.Content>
            </ScrollBarContainer>
          </div>
        </Tab.Container>
      </div>
    );
  };
}

export default connect()(Privacy);
