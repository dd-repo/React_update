import React from 'react';
import { connect } from 'react-redux';

import RequestedRemovals from 'routes/client/Monitoring/components/MonitoringRequests';
import InProgress from './InProgress';
import InQueue from './InQueue/InQueue';
import PrivacyRemovals from './PrivacyRemovals/PrivacyRemovals';
import CompletedRemovals from './CompletedRemovals';
import Documents from './Documents';
import { requestRemoval } from 'routes/client/Monitoring/modules/monitoring';
import {
    Tabs,
    Tab,
    Nav,
    NavItem
} from 'components';

class Privacy extends React.Component {

  handleRemovalRequest = removalId => {
    this.props.dispatch(requestRemoval(removalId))
  }

  render() {
    const { inProgress, inQueue, potentialRisks, completed } = this.props
    return (
      <Tab.Container id="profile-tabs" defaultActiveKey="inProgress">
        <div>
          <Nav bsStyle='tabs'>
            <NavItem eventKey='inProgress'>
              In Progress
            </NavItem>
            <NavItem eventKey='completed'>
              Completed
            </NavItem>
            <NavItem eventKey='potentialThreats'>
              Potential Threats
            </NavItem>
            <NavItem eventKey='inQueue'>
              In Queue
            </NavItem>
            <NavItem eventKey='documents'>
              Documents
            </NavItem>
          </Nav>
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
        </div>
      </Tab.Container>
    );
  };
}

export default connect()(Privacy);
