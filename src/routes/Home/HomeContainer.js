import React from 'react';
import Home from './components/HomeView';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { addPlan } from 'modules/planSelection';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';

class HomeContainer extends RoutedComponent {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor(props) {
      super(props)
      this.handleClick = this.handleClick.bind(this)
    }

    getLayoutOptions() {
        return {
            contentView: CONTENT_VIEW_STATIC,
            sidebarEnabled: false,
            navbarEnabled: false,
            footerEnabled: false,
            headerEnabled: false
        }
    }

    handleClick(type, price) {
      let plan = {type, price}
      this.props.addPlan(plan);
      //this.context.router.push('/signup');
    }

    render() {
      return <Home
        handleClick={this.handleClick}
        />;
    }
}

const mapStateToProps = (state) => ({
  planSelection: state.planSelection
});

const mapActionCreators = {
  addPlan
}

export default connect(mapStateToProps, mapActionCreators)(HomeContainer);
