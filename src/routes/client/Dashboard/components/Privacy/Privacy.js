import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';
import { info, removeAll } from 'react-notification-system-redux';

import RequestedRemovals from 'routes/client/Monitoring/components/MonitoringRequests';
import InProgress from './InProgress';
import InQueue from './InQueue/InQueue';
import PrivacyRemovals from './PrivacyRemovals/PrivacyRemovals';
import CompletedRemovals from './CompletedRemovals';
import Documents from 'routes/client/Account/components/Documents';
import { requestRemoval } from 'routes/client/Monitoring/modules/monitoring';
import DashboardPopover from '../DashboardPopover';
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
const dlDescription = 'To upload you driver license drag n drop your image or simply click browse'

class Privacy extends Component {
  constructor(props) {
    super(props)
    this.state = {activeTab: 'potentialThreats'}
  }

  componentDidMount() {
    this.props.inProgress.length > 0 &&
      this.setState({activeTab: 'inProgress'})
    this.props.driverLicenseNotification && !this.state.notificationMounted &&
      this.props.dispatch(this.createNotification())
  }

  componentWillReceiveProps(nextProps) {
    nextProps.active && this.handleScroll()
  }

  componentWillUnmount() {
    this.props.dispatch(removeAll())
  }

  handleScroll = () => {
    switch(this.props.screenSize) {
      case SCREEN_SIZE_XS:
        scrollToComponent(this.nodeRef, { offset: -350, align:'top', duration: 1000})
        break;
      case SCREEN_SIZE_SM:
        scrollToComponent(this.nodeRef, { offset: 0, align:'middle', duration: 1000})
        break;
      case SCREEN_SIZE_MD:
        scrollToComponent(this.nodeRef, { offset: 200, align:'bottom', duration: 1000})
        break;
    }
  }

  handleNotificationAction = () => {
    this.setState({ activeTab: 'documents', popoverActive: true })
    this.handleScroll()
  }

  createNotification = () => {
    const { driverLicenseNotification } = this.props
    return info({
      title: driverLicenseNotification.message_title,
      message: driverLicenseNotification.message_body,
      position: 'tr',
      autoDismiss: 0,
      action: {
        label: 'Take Action',
        callback: this.handleNotificationAction
      },
      onAdd: (notification) => { this.setState({notificationMounted: true}) },
      onRemove: () => { console.log('onRemove was called') }
    })
  }

  closePopover = () => {
    this.setState({popoverActive: false})
  }

  renderPopover = () => {
    if(this.props.active) {
      return <DashboardPopover
        active={this.props.active}
        description={description}
        title='Privacy Removals'
        placement='top'
        nodeRef={this.nodeRef}
        buttonTitle='Continue'
        handleClick={this.props.handleContinue}
      />
    }
    if(this.state.popoverActive) {
      return <DashboardPopover
        active={this.state.popoverActive}
        description={dlDescription}
        title='Upload Driver License'
        placement='top'
        nodeRef={this.documentsRef}
        buttonTitle='close'
        handleClick={this.closePopover}
      />
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

    return (
      <div className={styles}
        ref={ node => this.nodeRef = node }
      >
        { this.renderPopover() }
        <Tab.Container
          id="profile-tabs"
          activeKey={this.state.activeTab}
          defaultActiveKey={this.state.activeTab}
          onSelect={(activeTab) => { this.setState({activeTab})}}
        >
          <div>
            <Nav bsStyle='tabs'>
              <NavItem eventKey='inProgress'>
                In Progress
              </NavItem>
              <NavItem eventKey='inQueue'>
                In Queue
              </NavItem>
              <NavItem eventKey='potentialThreats'>
                Potential Threats
              </NavItem>
              <NavItem eventKey='completed'>
                Total Removals
              </NavItem>
              <NavItem ref={ ref => this.documentsRef = ref } eventKey='documents'>
                Documents
              </NavItem>
            </Nav>
            <ScrollBarContainer
              style={{ maxHeight: screenSize === SCREEN_SIZE_LG ? '500px' : '300px' }}
            >
              <Tab.Content animation>
                <Tab.Pane eventKey='inProgress'>
                  <InProgress requests={inProgress} />
                </Tab.Pane>
                <Tab.Pane eventKey='completed'>
                  <CompletedRemovals completed={completed} />
                </Tab.Pane>
                <Tab.Pane eventKey='potentialThreats'>
                  <PrivacyRemovals
                    privacyRemovals={potentialRisks}
                    handleRemovalRequest={this.handleRemovalRequest}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey='inQueue'>
                  <InQueue inQueue={inQueue} />
                </Tab.Pane>
                <Tab.Pane
                  eventKey='documents'>
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

Privacy.propTypes = {
  active: PropTypes.bool,
  styles: PropTypes.string,
  handleContinue: PropTypes.func,
  inProgress: PropTypes.array,
  inQueue: PropTypes.array,
  potentialRisks: PropTypes.array,
  completed: PropTypes.array,
  screenSize: PropTypes.string
}

export default connect()(Privacy);