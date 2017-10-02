import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';

import {
  Panel,
  Button,
  Overlay,
  Popover
} from 'components';

const PopoverGuide = props => (
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
        footer={(
            <Button
              className='text-center'
              bsStyle='primary'
              onClick={props.handleContinue}
            >
              Continue
            </Button>
          )}
      >
        { props.description }
    </Panel>
    </Popover>
  </Overlay>
)

export default PopoverGuide;

