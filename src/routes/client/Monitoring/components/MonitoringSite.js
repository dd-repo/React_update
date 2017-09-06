import React, { Component, PropTypes } from 'react';
import { formatDate, capitalize } from 'utils';

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
  }

  _onClick() {
    this.props.handleClick(this.props.monitoringSite.id)
  }

  render() {
    const { current_requested_at, updated_at, id, site, status, total_count } = this.props.monitoringSite
    const siteURL = `http://www.${site}`
    const siteName = capitalize(site.slice(0, -4))

      return (
        <tr className='bg-gray-darker' key={id}>
          <td className='text-white'>
            <a href={siteURL} target='_blank'>
              { siteName }
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
    }
  }
MonitoringSite.propTypes = {
  monitoringSite: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
}
export default MonitoringSite;

