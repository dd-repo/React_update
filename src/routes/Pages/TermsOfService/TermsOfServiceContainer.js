import PropTypes from 'prop-types';
import React from 'react'
import { RoutedComponent, connect } from 'routes/routedComponent'
import TOS from './TermsOfService'
import { CONTENT_VIEW_FLUID } from 'layouts/DefaultLayout/modules/layout'
import {
    Row,
    Col,
    Panel,
    Button
} from 'components'

class TermsOfServiceContainer extends RoutedComponent {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  getLayoutOptions () {
    return {
      contentView: CONTENT_VIEW_FLUID,
      navbarEnabled: true,
      sidebarEnabled: false,
      footerEnabled: true,
      headerEnabled: false
    }
  }

  render () {
    return (
      <Row>
        <Col lg={12}>
          <Row>
            <Col md={2}>
            </Col>
            <Col md={8}>
              <Panel
                header={(
                  <div>Our Terms Of Service</div>
                  )}
                footer={(
                    <Button onClick={() => this.context.router.goBack()}>
                      <i className='fa fa-angle-left m-r-1'></i>
                      Back
                    </Button>
                  )}
                >

                <TOS />

              </Panel>
                </Col>
              </Row>
            </Col>
          </Row>
    )
  }
}

export default connect()(TermsOfServiceContainer)
