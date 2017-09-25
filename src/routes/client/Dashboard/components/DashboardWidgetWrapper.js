import React, { Component, PropTypes} from 'react';
import classNames from 'classnames';
import {
  Button,
  Panel
} from 'components'

import classes from './dashboard.scss';


class DashboardWidgetWrapper extends Component {
  state = { onHover: false }

  handleMouseEnter = () => {
    this.setState({onHover: true})
  }

  handleMouseExit = () => {
    this.setState({onHover: false})
  }

  renderButton = () => {
    return this.state.onHover
      ?
        <div>
          <Panel className={classes.centerButton}
            footer={(
              <Button>Click Here</Button>
            )}
          >
            <div>
              This is an explanation of how to get start with using this feature
            </div>
          </Panel>
        </div>
        : null
  }
  render() {
    const { className, hasData } = this.props.children
    const classnames = classNames(className, {
      [`${classes.grayscale}`]: !hasData
    })

    return (
      <div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseExit}>
        { this.renderButton() }
        <div className={classnames}>
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default DashboardWidgetWrapper;
