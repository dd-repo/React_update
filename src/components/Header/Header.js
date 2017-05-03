import React from 'react';
import { IndexLink, Link } from 'react-router';
import uid from 'node-uuid';
import _ from 'underscore';
import {
    HEADER_STYLE_SIMPLE,
    HEADER_STYLE_BREADCRUMBS
} from 'layouts/DefaultLayout/modules/layout';
import { LinkContainer } from 'react-router-bootstrap';
import {
    Grid,
    Row,
    Col,
    PageHeader,
    Breadcrumb
} from 'react-bootstrap';

import { Colors } from 'consts';

import assignKeys, { findActiveNodes, CONFIGS } from 'routes/routesStructure';

import classes from './Header.scss';

const headers = {
    [HEADER_STYLE_SIMPLE]: ( title, path, containerFluid, children, dashboardPath ) => (
        <div className="sub-navbar sub-navbar__header">
            <Grid fluid={ containerFluid }>
                <Row>
                    <Col lg={ 12 }>
                        <div className={ classes.simpleHeaderWrap }>
                            <Row>
                                <Col xs={ children ? 6 : 12 }>
                                    <div className={ classes.headerPart }>
                                        <h1>
                                            { title }
                                        </h1>
                                    </div>
                                </Col>
                                {
                                    children && (
                                        <Col xs={ 6 }>
                                            <div className={ classes.headerPart }>
                                                { children }
                                            </div>
                                        </Col>
                                    )
                                }
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Grid>
        </div>
    ),
    [HEADER_STYLE_BREADCRUMBS]: ( title, path, containerFluid, children, dashboardPath ) => (
        <div className="sub-navbar sub-navbar__header-breadcrumbs">
            <Grid fluid={ containerFluid }>
                <Row>
                    <Col xs={ children ? 6 : 12 } className='sub-navbar-column'>
                        <div className="sub-navbar-header">
                            <h3>{ title || 'Home' }</h3>
                        </div>
                        {
                            (path && path.length > 0) ?
                                (
                                    <Breadcrumb
                                        className='navbar-text navbar-right no-bg'
                                    >
                                        <LinkContainer to={dashboardPath} onlyActiveOnIndex>
                                            <Breadcrumb.Item active={ false }>
                                                <i className="fa fa-fw fa-home"></i>
                                            </Breadcrumb.Item>
                                        </LinkContainer>
                                        {
                                            _.map(path.reverse(), (pathItem, index) => (
                                                <Breadcrumb.Item
                                                    href='javascript:void(0)'
                                                    active={ index === path.length - 1 }
                                                    key={ `header-breadcrumb-${index}` }
                                                >{ pathItem.title }</Breadcrumb.Item>
                                            ))
                                        }
                                    </Breadcrumb>
                                ) : null
                        }

                    </Col>
                    {
                        children && (
                            <Col xs={ 6 }>
                                { children }
                            </Col>
                        )
                    }
                </Row>
            </Grid>
        </div>
    )
};

const PATH = {
  'client': '/dashboard',
  'admin': '/admin/dashboard',
  'signup': '/signup'
}

const Header = (props) => {
    const path = findActiveNodes(props.sidebarConfigs, props.currentUrl);
    const { title } = (path && path.length > 0) ? path[0] : '';
    const dashboardPath = PATH[props.currentUserRole]

    return headers[props.style](title, path, props.fluid, props.children, dashboardPath);
}

Header.propTypes = {
    currentUrl: React.PropTypes.string.isRequired,
    style: React.PropTypes.string.isRequired,
    fluid: React.PropTypes.bool.isRequired,
    children: React.PropTypes.node,
    sidebarConfigs: React.PropTypes.array,
    currentUserRole: React.PropTypes.string
}

Header.defaultProps = {
    children: null
}

export default Header;
