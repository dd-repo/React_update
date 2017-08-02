import React, { Component } from 'react';
import { formatDate } from 'utils/dateHelper';
import capitalize from 'utils/capitalize';

import {
  Label,
  Button
} from 'components';

const REMOVAL_STATUS = {
  'requested': { style: 'danger', label: 'requested' },
  'queued': { style: 'warning', label: 'in queue' },
  'inprogress': { style: 'info', label: 'in progress' },
  'pending': { style: null, label: 'pending' },
  'completed': { style: 'success', label: 'protected' },
  'protected': { style: 'success', label: 'protected' },
};

export default class MonitoringSite extends Component {
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
      const { date_requested, updated_at, id, site, status } = this.props.monitoringSite
      const siteURL = `http://www.${site}`
      const friendlyURL = `${site}`
      const title = capitalize(site.slice(0, -4))
      const clicked =  status !== 'pending'
      const { style, label } = REMOVAL_STATUS[status]
      const renderButtonLabel = clicked ? 'Requested' : 'Request Removal'
      const buttonStyle = clicked ? 'success' : 'danger'

      if(status === 'pending') {
        return (
          <tr className='bg-gray-darker' key={id}>
            <td className='text-white'>
              <a href={siteURL} target='_blank'>
              { title }
              </a>
            </td>
            <td>
            </td>
            <td>
            </td>
            <td>
              <Button
                bsStyle={buttonStyle}
                disabled={clicked}
                onClick={this._onClick}
              >
                { renderButtonLabel }
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
              { formatDate(updated_at) }
            </td>
            <td>
              <span className=''>
                <h4 className="m-t-0 f-w-300 m-b-0">
                  1
                  <Button
                    bsStyle='link'
                    onClick={this._handleExpand}
                  >
                  <i className="fa fa-caret-down"></i>
                </Button>
                </h4>
              </span>
            </td>
          </tr>
        )
      }
  }
}
