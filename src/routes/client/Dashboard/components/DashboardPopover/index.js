import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import {
  Panel,
  Button,
  Overlay,
  Popover
} from 'components';

const DashboardPopover = props => {
  const renderButton = () => {
    if(props.handleClick) {
      return (
        <div>
          <Button
            className='text-center pull-right'
            bsStyle='link'
            onClick={props.handleClick}
          >
            {props.configs.buttonTitle}
          </Button>
        </div>
      )
    }
  }

  return (
    <Overlay
      show={props.active}
      placement={props.configs.placement}
      target={() => ReactDOM.findDOMNode(props.nodeRef)}
    >
      <Popover
        id='popover-guide'
        title={props.configs.title}
      >
        <Panel
          background='white'
          borderStyle='none'
          footer={renderButton()}
        >
          <p className='text-gray-darker'>
            { props.configs.description }
          </p>
        </Panel>
      </Popover>
    </Overlay>
  )
}

DashboardPopover.defaultProps = {
  active: false,
  rootClose: false,
}

DashboardPopover.propTypes = {
  active: PropTypes.bool,
  configs: PropTypes.object,
  handleClick: PropTypes.func,
  rootClose: PropTypes.bool
}

export default DashboardPopover;

