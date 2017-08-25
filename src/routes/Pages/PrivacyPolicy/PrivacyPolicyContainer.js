import React from 'react';
import { RoutedComponent, connect } from 'routes/routedComponent';
import PrivacyPolicy from './PrivacyPolicy';
import { CONTENT_VIEW_FLUID } from 'layouts/DefaultLayout/modules/layout';
import {
    Row,
    Col,
    Panel,
    Button
} from 'components';

class PrivacyPolicyContainer extends RoutedComponent {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  getLayoutOptions() {
    return {
      contentView: CONTENT_VIEW_FLUID,
      navbarEnabled: true,
      sidebarEnabled: false,
      footerEnabled: true,
      headerEnabled: false
    }
  }

  render() {
    return (
      <Row>
        <Col lg={ 12 }>
          <Col md={ 2 }>
          </Col>
          <Col md={ 8 }>
            <Panel
              header={(
                <div>Our Privacy Policy</div>
                )}
                footer={(
                    <Button onClick={ () => this.context.router.goBack() }>
                      <i className='fa fa-angle-left m-r-1'></i>
                      Back
                    </Button>
                  )}
                >

                <PrivacyPolicy />

              </Panel>
            </Col>
          </Col>
        </Row>
    )
  }
}

export default connect()(PrivacyPolicyContainer);
