import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';

import {
  Panel,
  Button,
  Overlay,
  Popover
} from 'components';

const DashboardPopover = props => {
  const renderButton = () => {
    if(props.handleClick) {
     return <Button
        className='text-center'
        bsStyle='primary'
        onClick={props.handleClick}
      >
        {props.buttonTitle}
      </Button>
    }
  }
  return (
    <Overlay
      show={props.active}
      placement={props.placement}
      target={() => ReactDOM.findDOMNode(props.nodeRef)}
    >
      <Popover
        id='popover-guide'
        title={props.title}
      >
        <Panel
          background='white'
          borderStyle='none'
          footer={renderButton()}
          >
            { props.description }
          </Panel>
        </Popover>
      </Overlay>
  )
}

DashboardPopover.defaultProps = {
  active: false,
  rootClose: false,
  buttonTitle: 'Continue'
}

DashboardPopover.propTypes = {
  active: PropTypes.bool,
  description: PropTypes.string,
  title: PropTypes.string,
  placement: PropTypes.string,
  handleClick: PropTypes.func,
  buttonTitle: PropTypes.string,
  rootClose: PropTypes.bool
}

export default DashboardPopover;

