import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import scrollToComponent from 'react-scroll-to-component'
import RootModal from 'components/Modals'

import {
  setSidebarStyle,
  SIDEBAR_STYLE_SLIM,
  SIDEBAR_STYLE_DEFAULT,
  SCREEN_SIZE_LG
} from 'layouts/DefaultLayout/modules/layout'
import { showModal, hideModal } from 'modules/modal'
import classes from './dashboardWrapper.scss'
import CONFIGS from './configs'

const WIDGETS_SET = [
  'keywords',
  'googleResults',
  'privacyReport',
  'privacyRemovals'
]

const initialState = {
  isActive: false,
  keywords: CONFIGS.keywords,
  privacyRemovals: CONFIGS.privacyRemovals,
  googleResults: CONFIGS.googleResults,
  privacyReport: CONFIGS.privacyReport
}

const startState = {
  isActive: true,
  step: 0,
  activeWidget: 'keywords',
  keywords: CONFIGS.keywords,
  privacyRemovals: {active: false},
  googleResults: {active: false},
  privacyReport: {active: false}
}

const updateWidgetStates = prevState => {
  const { step } = prevState
  const nextWidget = WIDGETS_SET[step + 1]
  const prevWidget = WIDGETS_SET[step]
  return {
    step: step + 1,
    activeWidget: nextWidget,
    [prevWidget]: {active: false},
    [nextWidget]: CONFIGS[nextWidget]
  }
}

class DashboardWidgetWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = initialState
  }

  componentDidMount () {
    if (this.props.signInCount < 2) {
      this.props.dispatch(showModal('DASHBOARD_WELCOME'))
    }
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.state.step > 2) {
      this.props.screenSize !== SCREEN_SIZE_LG
       ? scrollToComponent(this.dashboardRef, {offset: 500, align: 'bottom', duration: 1000})
        : this.props.dispatch(setSidebarStyle(SIDEBAR_STYLE_DEFAULT))
    }
  }

  handleStart = () => {
    this.props.dispatch(setSidebarStyle(SIDEBAR_STYLE_SLIM))
    this.props.dispatch(hideModal())
    this.setState(startState)
  }

  handleContinue = () => {
    if (this.state.step > 2) {
      this.setState(initialState)
    } else {
      this.setState(updateWidgetStates)
    }
  }

  handleExitTutorial = () => {
    this.setState(initialState)
    this.props.dispatch(setSidebarStyle(SIDEBAR_STYLE_DEFAULT))
  }

  render () {
    return (
      <div
        className={classes.mainWrap}
        ref={ref => { this.dashboardRef = ref }}
      >
        {this.props.children(this.state, this.handleContinue, this.handleExitTutorial)}
        <RootModal handleClick={this.handleStart} />
      </div>
    )
  }
}

DashboardWidgetWrapper.propTypes = {
  children: PropTypes.func,
  dispatch: PropTypes.func,
  screenSize: PropTypes.string,
  signInCount: PropTypes.number
}

export default connect()(DashboardWidgetWrapper)
