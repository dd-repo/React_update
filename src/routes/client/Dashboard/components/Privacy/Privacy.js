import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import scrollToComponent from 'react-scroll-to-component'
import classnames from 'classnames'
import { info, removeAll } from 'react-notification-system-redux'

import RequestedRemovals from 'routes/client/Monitoring/components/MonitoringRequests'
import InProgress from './InProgress'
import InQueue from './InQueue/InQueue'
import PotentialRisks from 'routes/client/Monitoring/components/MonitoringSites'
import CompletedRemovals from './CompletedRemovals'
import Documents from 'routes/client/Account/components/Documents'
import { requestRemoval } from 'routes/client/Monitoring/modules/monitoring'
import { updateAccountNotificationStatus } from 'routes/client/Account/modules/notifications'
import DashboardPopover from '../DashboardPopover'
import classes from '../dashboard.scss'
import {
  SCREEN_SIZE_LG,
  SCREEN_SIZE_MD,
  SCREEN_SIZE_SM,
  SCREEN_SIZE_XS
} from 'layouts/DefaultLayout/modules/layout'
import {
    Tabs,
    Tab,
    Nav,
    NavItem,
    ScrollBarContainer
} from 'components'

const description = 'This is a list of sites which are notorious for spreading your private information around the web. You can request removal of your information from any or all of these sites. As soon as you click “Request Removal,” your request will enter your queue, and our team of experts will get to work protecting your privacy.'

const driverLicensePopoverConfigs = {
  description: 'To upload you driver license drag n drop your image or simply click browse',
  title: 'Upload Driver License',
  placement: 'top',
  buttonTitle: 'close'
}

class Privacy extends Component {
  constructor (props) {
    super(props)
    this.state = {activeTab: 'potentialThreats'}
  }

  componentDidMount () {
    this.props.inProgress.length > 0 &&
      this.setState({activeTab: 'inProgress'})
    this.props.driverLicenseNotification && this.props.driverLicenseNotification.is_active &&
      this.createNotification()
  }

  componentWillReceiveProps (nextProps) {
    nextProps.configs.active && this.handleScroll()
  }

  componentWillUnmount () {
    this.props.removeAll()
  }

  handleScroll = () => {
    switch (this.props.screenSize) {
    case SCREEN_SIZE_XS:
      scrollToComponent(this.nodeRef, { offset: -350, align: 'top', duration: 1000})
      break
    case SCREEN_SIZE_SM:
      scrollToComponent(this.nodeRef, { offset: 0, align: 'middle', duration: 1000})
      break
    case SCREEN_SIZE_MD:
      scrollToComponent(this.nodeRef, { offset: 200, align: 'bottom', duration: 1000})
      break
    }
  }

  handleNotificationAction = () => {
    this.props.updateAccountNotificationStatus(this.props.driverLicenseNotification.id)
    this.setState({ activeTab: 'documents', configs: driverLicensePopoverConfigs, popoverActive: true })
    this.handleScroll()
  }

  createNotification = () => {
    const { driverLicenseNotification } = this.props
    this.props.info({
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
    if (this.state.popoverActive) {
      return <DashboardPopover
        active={this.state.popoverActive}
        configs={this.state.configs}
        nodeRef={this.documentsRef}
        handleClick={this.closePopover}
      />
    }
  }

  handleRemovalRequest = removalId => {
    this.props.requestRemoval(removalId)
  }

  render () {
    const {
      tutorialIsActive,
      configs,
      inProgress,
      inQueue,
      potentialRisks,
      completed,
      screenSize
    } = this.props

    const highlightStyles = classnames({[`${classes.highlight}`]: tutorialIsActive && configs.active})

    return (
      <div className={highlightStyles}
        ref={node => this.nodeRef = node}
      >
        {this.renderPopover()}
        <Tab.Container
          id="profile-tabs"
          activeKey={this.state.activeTab}
          defaultActiveKey={this.state.activeTab}
          onSelect={(activeTab) => { this.setState({activeTab}) }}
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
                Potential Risks
              </NavItem>
              <NavItem eventKey='completed'>
                Total Removals
              </NavItem>
              <NavItem ref={ref => this.documentsRef = ref} eventKey='documents'>
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
                  <PotentialRisks
                    potentialRisks={potentialRisks}
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
    )
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

const mapStateToProps = (state) => ({
  driverLicenseNotification: state.account.notifications.request_upload_driver_license
})

const mapActionCreators = ({
  info,
  removeAll,
  requestRemoval,
  updateAccountNotificationStatus
})

export default connect(mapStateToProps, mapActionCreators)(Privacy)
