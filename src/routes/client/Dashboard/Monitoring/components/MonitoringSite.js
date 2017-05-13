import React, { Component } from 'react';

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
  }

  _onClick() {
    this.props.handleClick(this.props.monitoringSite.id)
  }

  render() {
      const { id, site, status } = this.props.monitoringSite
      const siteURL = `http://www.${site}`
      const friendlyURL = `www.${site}`
      const title = site.slice(0, -4)
      const clicked =  status !== 'pending'
      const { style, label } = REMOVAL_STATUS[status]

      const renderButtonLabel = clicked ? 'Requested' : 'Request Removal'
      const buttonStyle = clicked ? 'success' : 'danger'
    return (
        <tr className='bg-gray-darker' key={id}>
          <td>
              { title }
          </td>
          <td className='text-white'>
            <a href={siteURL} target='_blank'>
              { friendlyURL }
            </a>

          </td>
          <td className='text-right'>
            <Label
              outline
              className='text-uppercase'
              bsStyle={style}>
              { label }
            </Label>
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
  }
}
