import React from 'react';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_FLUID } from 'layouts/DefaultLayout/modules/layout';

class UserContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  getLayoutOptions() {
    return {
      contentView: CONTENT_VIEW_FLUID,
      sidebarEnabled: true,
      navbarEnabled: true,
      footerEnabled: true,
      headerEnabled: false
    }
  }

  componentWillMount() {
    const userId = parseInt(this.props.params.id)
    const users = this.props.users.all
    const user = users.find(user => {
     return user.id === userId
    })
    this.setState({user})
  }

  render() {
    return (
      <div></div>
    )
  }
}

const mapStateToProps = state => ({
   users: state.users
})

export default connect(mapStateToProps)(UserContainer);
