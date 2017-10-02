import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import reactDOM from 'react-dom';
import classNames from 'classnames';
import scrollToComponent from 'react-scroll-to-component';
import faker from 'faker';

import {
  SCREEN_SIZE_LG,
  SCREEN_SIZE_MD,
  SCREEN_SIZE_SM,
  SCREEN_SIZE_XS
} from 'layouts/DefaultLayout/modules/layout';
import { setSidebarStyle, SIDEBAR_STYLE_SLIM, SIDEBAR_STYLE_DEFAULT } from 'layouts/DefaultLayout/modules/layout';
import { showModal, hideModal } from 'modules/modal';
import { Button, RootModal } from 'components';
import classes from './dashboardWrapper.scss';

const WIDGETS_SET = new Set([
  'keywords',
  'googleResults',
  'privacyReport',
  'privacyRemovals'
])
const activeState = { status: true, overlay: {}, highlight: classes.highlight }
const inActiveState = { status: false, overlay: classes.overlay }
const startState = {
  widgets: WIDGETS_SET,
  keywords: activeState,
  privacyRemovals: inActiveState,
  googleResults: inActiveState,
  privacyReport: inActiveState
}

const initialState = {
  step: 1,
  keywords: {styles: {}},
  privacyRemovals: {styles: {}},
  googleResults: {styles: {}},
  privacyReport: {styles: {}}
}

const updateWidgetStates = prevState => {
  const widgets = prevState.widgets.values()
  const currentWidget = widgets.next().value
  const nextWidget = widgets.next().value
  prevState.widgets.delete(currentWidget)
  return {
    widgets: prevState.widgets,
    [currentWidget]: inActiveState,
    [nextWidget]: activeState,
  }
}

class DashboardWidgetWrapper extends Component {
  constructor(props)  {
    super(props)
    this.state = initialState
  }

  componentDidMount() {
    this.props.dispatch(showModal('DASHBOARD_WELCOME'))
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.step > 4) {
      this.setState(initialState)
      this.props.screenSize !== SCREEN_SIZE_LG &&
        scrollToComponent(this.dashboardRef, {offset: 500, align: 'bottom', duration: 1000})
      this.props.screenSize === SCREEN_SIZE_LG &&
        this.props.dispatch(setSidebarStyle(SIDEBAR_STYLE_DEFAULT))
    }
  }

  handleStart = () => {
    this.props.dispatch(hideModal())
    this.props.dispatch(setSidebarStyle(SIDEBAR_STYLE_SLIM))
    this.setState(startState)
  }

  handleContinue = () => {
    this.setState(prevState => ({
      step: prevState.step + 1
    }));
    this.setState(updateWidgetStates)
  }

  render() {
    return (
      <div
        className={classes.mainWrap}
        ref={ ref => this.dashboardRef = ref }
      >
        { this.props.children(this.state, this.handleStart, this.handleContinue) }
      </div>
    )
  }
}

export default connect()(DashboardWidgetWrapper);

