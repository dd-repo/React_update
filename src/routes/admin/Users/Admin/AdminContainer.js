import React from 'react';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_FLUID } from 'layouts/DefaultLayout/modules/layout';
import { fetchAdmin, updateAdminDetails } from './modules/admin';
import { clearNotification } from './modules/notification';
import { showModal, hideModal } from 'modules/modal';
import Admin from './components/Admin';

class AdminContainer extends RoutedComponent {
  constructor(props) {
    super(props)
  }

  getLayoutOptions() {
    return {
      contentView: CONTENT_VIEW_FLUID,
      sidebarEnabled: true,
      navbarEnabled: true,
      headerEnabled: false
    }
  }

  componentWillMount() {
    this.props.fetchAdmin(this.props.params)
  }

  componentWillUnmount() {
    this.clearNotification()
  }

  handleFormSubmit = data => {
    this.props.hideModal()
    const { is_active, role } = data
    const userRole = typeof role === 'object' ? role.value : role
    const active = typeof is_active === 'object' ? is_active.value : is_active
    const params = {
      user: {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        group: data.group,
        id: data.id,
        is_active: active,
        role: userRole
      }
    }
    this.props.updateAdminDetails(params)
  }

  clearNotification = () => {
    this.props.clearNotification()
  }

  render() {
    return (
      <Admin
        admin={this.props.admin}
        notification={this.props.notification}
        isFetching={this.props.admin.isFetching}
        showModal={this.props.showModal}
        handleFormSubmit={this.handleFormSubmit}
        clearMessage={this.clearNotification}
      />
    )
  }
}

const mapStateToProps = state => ({
  admin: state.admin.details,
  notification: state.admin.notification
})

const mapActionCreators = {
  fetchAdmin,
  updateAdminDetails,
  showModal,
  hideModal,
  clearNotification
}

export default connect(mapStateToProps, mapActionCreators)(AdminContainer);
