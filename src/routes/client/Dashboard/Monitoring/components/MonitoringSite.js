import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { formatDate } from 'utils/dateHelper';
import capitalize from 'utils/capitalize';

import {
  Label,
  Button,
  Overlay,
  Popover
} from 'components';


class MonitoringSite extends Component {
  constructor(props) {
    super(props)

    this._onClick = this._onClick.bind(this);
    this._handleExpand = this._handleExpand.bind(this);
  }

  _onClick() {
    this.props.handleClick(this.props.monitoringSite.id)
  }

  _handleExpand() {
    this.props.handleExpand(this.props.monitoringSite.id)
  }

  render() {
      const { current_requested_at, updated_at, id, site, status, total_count } = this.props.monitoringSite
      const siteURL = `http://www.${site}`
      const title = capitalize(site.slice(0, -4))

      const overlay = (
        <Overlay
          show={true}
          placement='left'
          container={this}
          target={() => ReactDOM.findDOMNode(this.refs.target)}
          overlay={(
            <Popover
              id='popover-removal-request'
            >
              Click here to request your first removal
            </Popover>
            )}
          >
          </Overlay>
      )

      if(status === 'pending') {
        return (
            <tr className='bg-gray-darker' key={id}>
              <td className='text-white'>
                <a href={siteURL} target='_blank'>
                  { title }
                </a>
              </td>
              <td>
                <h4 className="m-t-0 f-w-300 m-b-0">
                  { total_count }
                </h4>
              </td>
              <td>
                <Button
                  ref='target'
                  bsStyle='danger'
                  onClick={this._onClick}
                >
                  Request Removal
                </Button>
              </td>
            </tr>
        )
      } else {
        return (
          <tr className='bg-gray-darker' key={id}>
            <td className='text-white'>
              <a href={siteURL} target='_blank'>
                { title }
              </a>
            </td>
            <td>
              { formatDate(current_requested_at) || formatDate(updated_at) }
            </td>
            <td>
              <span className=''>
                <h4 className="m-t-0 f-w-300 m-b-0">
                  { total_count }
                </h4>
              </span>
            </td>
          </tr>
        )
      }
  }
}
MonitoringSite.propTypes = {
  showPopover: PropTypes.bool,
  handleClick: PropTypes.func
}
export default MonitoringSite;
