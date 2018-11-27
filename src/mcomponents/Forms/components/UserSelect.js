import React, { Component } from 'react'
import PropTypes from 'prop-types'
import infosweepApi from 'services/infosweepApi'
import ReduxFormSelect from './ReduxFormSelect'
import { USERS_REQUEST } from 'routes/admin/Users/modules/users'

class UserSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: { name: 'Loading', placeHolder: 'Loading ....', list: [] }
    }
  }

  componentWillMount () {
    const { group, role, isActive } = this.props
    const queryParams = {
      q: {
        group_eq: group,
        role_eq: role,
        is_active_eq: isActive
      }
    }

    infosweepApi.get(USERS_REQUEST, queryParams)
      .then ( res => this.setState({
        users: this.formatUser(res)
      }))
  }

  formatUser = res => {
    const { users } = res.data
    const { name, placeholder, targetValue, targetLabel } = this.props
    this.setState({
      user: {
        name,
        placeHolder: placeholder,
        list: users.map( user => ({
          value: user[targetValue],
          label: user[targetLabel]
        }))
      }
    })
  }

  render () {
    return <ReduxFormSelect field={this.state.user || this.state.loading} />
  }
}

UserSelect.defaultProps = {
  role: '*',
  isActive: 'true',
  name: 'user'
}

UserSelect.propsTypes = {
  role: PropTypes.string,
  isActive: PropTypes.string,
  group: PropTypes.string.isRequired,
  name: PropTypes.string,
  targetValue: PropTypes.string.isRequired,
  targetLabel: PropTypes.string.isRequired
}

export default UserSelect
