import React, { Component } from 'react';
import { connect } from 'react-redux'
import PotentialRisk from './MonitoringSite';
import { requestRemoval } from 'routes/client/Monitoring/modules/monitoring'
import { showModal, hideModal } from 'modules/modal'
import { Table } from 'components';

class PotentialRisks extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleRemovalRequest = this.handleRemovalRequest.bind(this)
    this.hasDriverLicense = this.hasDriverLicense.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.potentialRisk && !nextProps.profile.isFetching && nextProps.profile.driver_license) {
      this.props.hideModal()
      this.props.requestRemoval(this.state.potentialRisk.id)
      this.setState({potentialRisk: null})
    }
  }

  handleRemovalRequest (potentialRisk) {
    console.log('has DL', this.hasDriverLicense())
    if (potentialRisk.id_required && !this.hasDriverLicense()) {
      this.setState({potentialRisk})
      this.props.showModal("MONITORING_REQUEST_ID_REQUIRED", potentialRisk)
    } else {
      this.props.requestRemoval(potentialRisk.id)
    }
  }

  hasDriverLicense () {
    return this.props.profile.driver_license
  }

  render () {
    if (!this.props.isFetching ) {
      return (
        <Table>
          <thead>
            <tr>
              <th>
                name of site
              </th>
              <th>
                records removed
              </th>
              <th>
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.potentialRisks.map(
                potentialRisk =>
                <PotentialRisk
                  potentialRisk={potentialRisk}
                  key={potentialRisk.id}
                  handleRemovalRequest={this.handleRemovalRequest}
                />
              )
            }
          </tbody>
        </Table>
      )
    }
    return <span></span>
  }
}

const mapStateToProps = state => ({
  profile: state.account.profile
})

const mapActionCreators = { requestRemoval, showModal, hideModal }

export default connect(mapStateToProps, mapActionCreators)(PotentialRisks)
