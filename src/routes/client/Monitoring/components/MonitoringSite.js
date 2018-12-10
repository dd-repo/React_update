import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    this.props.handleRemovalRequest(this.props.potentialRisk)
  }

  render() {
    const { current_requested_at, updated_at, id, site, status, total_count } = this.props.potentialRisk
    const siteURL = `http://www.${site}`
    const siteName = capitalize(site.slice(0, -4))
    return (
      <tr key={id}>
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
            bsStyle='primary'
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
  potentialRisk: PropTypes.object.isRequired,
  handleRemovalRequest: PropTypes.func.isRequired
}
export default MonitoringSite;

