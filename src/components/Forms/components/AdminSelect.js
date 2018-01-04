import React, { Component } from 'react'
import infosweepApi from 'services/infosweepApi'
import ReduxFormSelect from './ReduxFormSelect'
import { USERS_REQUEST } from 'routes/admin/Users/modules/users'

export default class AdminSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    const params = {
      q: { 
        group_eq: 'backend',
        is_active_eq: true
      }
    }
    infosweepApi.get(USERS_REQUEST, params)
      .then ( res => this.setState({
        admin: this.formatSalesReps(res)
      }))
  }

  formatSalesReps (res) {
    const { users } = res.data
    return {
      name: 'sales_rep_id',
      list: users.map( user => ({
        value: user.id,
        label: user.name
      }))
    }
  }

  render () {
    if (this.state.admin) {
      return <ReduxFormSelect field={this.state.admin} />
    } else {
      return <span></span>
    }
  }
}
