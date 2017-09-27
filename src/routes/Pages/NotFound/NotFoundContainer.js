import React from 'react';
import uid from 'node-uuid';
import { Link } from 'react-router';
import {
    Row,
    Col,
    Panel,
    InputGroup,
    FormControl,
    Button
} from 'components';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_FLUID } from 'layouts/DefaultLayout/modules/layout';

import classes from './../Pages.scss';
import logo from 'static/logos/logo-white-sm.png';

const HOME_LINK = {
  'client': '/dashboard',
  'admin': '/admin/dashboard',
  'prospect': '/login',
}

class NotFoundContainer extends RoutedComponent {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

    getLayoutOptions() {
        return {
            contentView: CONTENT_VIEW_FLUID,
            navbarEnabled: false,
            sidebarEnabled: false,
            footerEnabled: false,
            headerEnabled: false
        }
    }

    render() {
      const homeLink = HOME_LINK[this.props.currentUser.role]

        return (
            <Row>
                <Col lg={ 12 }>
                    <Button className='m-t-2 m-b-1' onClick={ () => this.context.router.goBack() }>
                        <i className='fa fa-angle-left m-r-1'></i>
                        Back
                    </Button>

                    <Row>
                        <Col className={ classes.centerCol } md={ 4 }>
                            <Panel
                                className={ classes.registerPanel }
                                header={(
                                    <Link to={homeLink} className={ classes.toHomeLink }>
                                        <img src={ logo } alt='Back to Home' />
                                    </Link>
                                )}
                                footer={
                                    <div className={ classes.infoPanelFooter }>
                                        <Link to={homeLink}>
                                            <i className="fa fa-angle-left m-r-1"></i>
                                            Back to Home
                                        </Link>
                                    </div>
                                }
                            >
                                <h2 className={ classes.panelHeader }>
                                    Error 404
                                </h2>
                                <p className='text-center m-b-3'>
                                    Sorry but the page you are looking for ( <span className='text-white'>{this.props.location.pathname}</span> ) was not found. Try to fix the URL.
                                </p>
                            </Panel>
                            <p className='text-center text-gray-light'>
                                <strong>Blitz Monitoring </strong>
                                <span className='text-gray-light'>
                                    © 2009 - 2017. Made by <i className="fa fa-fw fa-ship text-primary"></i> Denver, US
                                </span>
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

export default connect(mapStateToProps)(NotFoundContainer);
