import React from 'react'
import classes from './HomeView.scss'
import { RoutedComponent, connect } from './../../routedComponent'
import { Link } from 'react-router';

import PricingTables from 'components/PricingTables'
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';

export class HomeView extends RoutedComponent {
    getLayoutOptions() {
        return {
            contentView: CONTENT_VIEW_STATIC,
            sidebarEnabled: false,
            navbarEnabled: false,
            footerEnabled: false,
            headerEnabled: false
        }
    }

    handleSubmit(type) {
    }
    render() {
        return (
          <div className='home-page'>
            <PricingTables
              handleSubmit={this.handleSubmit}
            />
          </div>
        );
    }
}

export default connect()(HomeView);
