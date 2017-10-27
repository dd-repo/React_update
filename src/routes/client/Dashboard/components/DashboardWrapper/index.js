import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import reactDOM from 'react-dom';
import classNames from 'classnames';
import scrollToComponent from 'react-scroll-to-component';
import faker from 'faker';
import RootModal from 'components/Modals';

import {
  SCREEN_SIZE_LG,
  SCREEN_SIZE_MD,
  SCREEN_SIZE_SM,
  SCREEN_SIZE_XS
} from 'layouts/DefaultLayout/modules/layout';
import {
  setSidebarStyle,
  SIDEBAR_STYLE_SLIM,
  SIDEBAR_STYLE_DEFAULT
} from 'layouts/DefaultLayout/modules/layout';
import { showModal, hideModal } from 'modules/modal';
import { Button } from 'components';
import classes from './dashboardWrapper.scss';
import CONFIGS from './configs';

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
  constructor(props)  {
    super(props)
    this.state = initialState
  }

  componentDidMount() {
    console.log('signInCount', this.props.signInCount)
    if(this.props.signInCount < 1) {
      this.props.dispatch(showModal('DASHBOARD_WELCOME'))
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.state.step > 2) {
     this.props.screenSize !== SCREEN_SIZE_LG
       ?
         scrollToComponent(this.dashboardRef, {offset: 500, align: 'bottom', duration: 1000})
           :
             this.props.dispatch(setSidebarStyle(SIDEBAR_STYLE_DEFAULT))
   }
  }

  handleStart = () => {
    this.props.dispatch(setSidebarStyle(SIDEBAR_STYLE_SLIM))
    this.props.dispatch(hideModal())
    this.setState(startState)
  }

  handleContinue = () => {
    if(this.state.step > 2) {
      this.setState(initialState)
    }else{
      this.setState(updateWidgetStates)
    }
  }

  handleExitTutorial = () => {
    this.setState(initialState)
    this.props.dispatch(setSidebarStyle(SIDEBAR_STYLE_DEFAULT))
  }

  render() {
    return (
      <div
        className={classes.mainWrap}
        ref={ ref => this.dashboardRef = ref }
      >
        { this.props.children(this.state, this.handleContinue, this.handleExitTutorial) }
        <RootModal handleClick={this.handleStart} />
      </div>
    )
  }
}

export default connect()(DashboardWidgetWrapper);
