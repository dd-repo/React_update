import React from 'react'
import _ from 'underscore'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import Notifications from 'react-notification-system-redux'
import classNames from 'classnames'

import getLogoBySkin from './getLogoBySkin.js'
import assignKeys, { findActiveNodes, CONFIGS } from './../../routes/routesStructure'
import { removePersistedData } from 'localStorage'
import { logout } from 'routes/auth/modules/auth'

import { Colors } from 'consts'
import navbarLogo from 'static/logos/logo-dark-md.png'
import {
  infosweepEmail,
  infosweepPhoneNumber,
  infosweepAddress
} from 'consts/infosweepInfo'

// Components
import {
    Grid,
    Row,
    Col,
    Layout,
    Sidebar,
    OutsideClick,
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    AvatarImage,
    MenuItem,
    RightSidebar,
    Tabs,
    Tab,
    Header,
    Footer,
    Button,
    Media
} from 'components'

import classes from './DefaultLayout.scss'

// Redux Module imports
import {
    setSidebarStyle,
    toggleRightSidebar,
    toggleSidebarSlim,
    toggleOverlaySidebarOpen,
    setCurrentScreenSize,
    toggleNavbarExpanded,
    changeSidebarAddOn,
    registerChangeHandler,

    SIDEBAR_ADDON_DEFAULT,
    SIDEBAR_ADDON_PROGRESS,
    SIDEBAR_ADDON_MENU,
    SIDEBAR_ADDON_BARS,
    SIDEBAR_ADDON_AVATAR_AND_BARS,
    SIDEBAR_ADDON_AVATAR_AND_NUMBERS,
    SIDEBAR_ADDON_AVATAR_AND_STATS,

    SIDEBAR_STYLE_DEFAULT,
    SIDEBAR_STYLE_SLIM,
    SIDEBAR_STYLE_BIGICONS,
    SIDEBAR_STYLE_BIGICONS_AVATAR,

    SKIN_DARK,
    SKIN_LIGHT,
    SKIN_COLOR,

    CONTENT_VIEW_STATIC,
    CONTENT_VIEW_FLUID,
    CONTENT_VIEW_BOXED,

    HEADER_STYLE_DISABLED,
    HEADER_STYLE_SIMPLE,
    HEADER_STYLE_BREADCRUMBS,

    SCREEN_SIZE_LG,
    SCREEN_SIZE_MD,
    SCREEN_SIZE_SM,
    SCREEN_SIZE_XS
} from './modules/layout.js'

// Sub Components
import {
    SidebarAddOns,
    LayoutOptions,
    SearchBox,
    SearchBoxMobile,
    MessagesDropdown,
    NotificationsDropdown,
    ContactDropdown,
    RightSidebarTabs
} from './components'

// import rightSidebarDataRaw from 'consts/data/right-sidebar.json';

const titleBase = 'InfoSweep '

const sidebarAddOns = {
  [SIDEBAR_ADDON_PROGRESS]: (props) => (<SidebarAddOns.ProgressAddOn {...props} />),
  [SIDEBAR_ADDON_MENU]: (props) => (<SidebarAddOns.MenuAddOn {...props} />),
  [SIDEBAR_ADDON_BARS]: (props) => (<SidebarAddOns.BarsAddOn {...props} />),
  [SIDEBAR_ADDON_AVATAR_AND_BARS]: (props) => (<SidebarAddOns.AvatarAndBarsAddOn {...props} />),
  [SIDEBAR_ADDON_AVATAR_AND_NUMBERS]: (props) => (<SidebarAddOns.AvatarAndNumbersAddOn {...props} />),
  [SIDEBAR_ADDON_AVATAR_AND_STATS]: (props) => (<SidebarAddOns.AvatarAndStatsAddOn {...props} />)
}

// const rightSidebarData = treeRandomizer(rightSidebarDataRaw);

let rightSidebarTriggerRef,
  sidebarTriggerRef,
  navbarTriggerRef

class DefaultLayout extends React.Component {
  static propTypes = {
    sidebarAddon: React.PropTypes.string
  };

  constructor (props, context) {
    super(props, context)
    this.state = { sidebarConfigs: this.setSidebarConfigs(this.props.currentUser.group) }
    this.beforeSlimSidebarStyle = SIDEBAR_STYLE_DEFAULT
    this.handleLogout = this.handleLogout.bind(this)
    this.setSidebarConfigs = this.setSidebarConfigs.bind(this)
  }

  setSidebarConfigs (group) {
    return assignKeys(CONFIGS[group])
  }

  toggleSidebarSlim () {
    const { sidebarStyle, setSidebarStyle } = this.props

    if (sidebarStyle === SIDEBAR_STYLE_SLIM) {
      setSidebarStyle(this.beforeSlimSidebarStyle)
    } else {
      this.beforeSlimSidebarStyle = sidebarStyle
      setSidebarStyle(SIDEBAR_STYLE_SLIM)
    }
  }

  componentDidMount () {
    this.bodyElement = document.querySelector('body')
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentUser.role !== this.props.currentUser.role) {
      this.setState({ sidebarConfigs: this.setSidebarConfigs(nextProps.currentUser.group) })
    }
  }

  componentDidUpdate (prevProps) {
        // Set Overflow: Hidden on body when overlay mode is enabled
    this.bodyElement.style.overflow = (this.props.currentScreenSize === SCREEN_SIZE_XS &&
            (
                this.props.navbarExpanded ||
                this.props.overlaySidebarOpen ||
                this.props.rightSidebarEnabled
            )) ? 'hidden' : 'auto'

        // Update page title
    const routes = assignKeys(CONFIGS['frontend'])
    const activeRoute = _.first(findActiveNodes(routes, this.props.location.pathname))
    activeRoute
      ? document.title = titleBase + activeRoute.title
      : document.title = titleBase
  }

  handleLogout () {
    removePersistedData()
    this.props.logout()
  }

  openFaqTab () {
    window.open('https://www.infosweep.com/faq', '_blank')
  }

  render () {
    const { role, group } = this.props.currentUser
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const isClient = role === 'client' && isLoggedIn
    const isAdmin = group === 'backend' && isLoggedIn

    const homeLink = () => {
      if (isClient) { return '/dashboard' }
      if (isAdmin) { return '/admin/dashboard' }
      if (!isLoggedIn) { return '/login' }
    }

    const fullName = `${this.props.currentUser.first_name} ${this.props.currentUser.last_name}`

    const staticFootNavContainer =
        !this.props.sidebarEnabled && this.props.contentView === CONTENT_VIEW_STATIC

        // const navbarLogo = getLogoBySkin.navbar(this.props.navbarSkin, this.props.skinColor),
    const sidebarOverlayLogo = getLogoBySkin.sidebar(this.props.sidebarSkin, 'overlay', this.props.skinColor),
      sidebarBigLogo = getLogoBySkin.sidebar(this.props.sidebarSkin, 'big', this.props.skinColor),
      sidebarSlimLogo = getLogoBySkin.sidebar(this.props.sidebarSkin, 'slim', this.props.skinColor)

    const footerAddressClass = this.props.currentScreenSize !== SCREEN_SIZE_XS &&
      classNames(`${classes.footerAddress}`)

    const footerClass = this.props.currentScreenSize === SCREEN_SIZE_XS &&
      classNames(`${classes.footerSmall}`)

    return (
            <Layout
              {...this.props}
              screenSizeChanged={
                    newScreenSize => this.props.setCurrentScreenSize(newScreenSize)
                }
            >
                <Layout.Navigation>
                    <Navbar
                      fluid={!staticFootNavContainer}
                      inverse
                      componentClass='div'
                      expanded={this.props.navbarExpanded}
                      onToggle={() => { }}
                    >
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to={homeLink()}>
                                  <img src={navbarLogo} className={classes.navbarLogo} height={60} alt="infosweep Dashboard" />
                                </Link>
                            </Navbar.Brand>

                            {}
                            {
                                this.props.currentScreenSize === SCREEN_SIZE_XS && isClient && (
                                    <div className='pull-right'>
                                        <button
                                          className='btn btn-outline navbar-toggle'
                                          onClick={() => this.props.toggleRightSidebar(!this.props.rightSidebarEnabled)}
                                          ref={ref => { rightSidebarTriggerRef = ref }}
                                        >
                                            <i className='fa fa-fw fa-align-right text-black'></i>
                                        </button>
                                        <button
                                          className='btn btn-outline navbar-toggle'
                                          onClick={() => this.props.toggleNavbarExpanded(!this.props.navbarExpanded)}
                                          ref={ref => { navbarTriggerRef = ref }}
                                        >
                                            <i className='fa fa-fw fa-user text-black'></i>
                                        </button>
                                        <button
                                          className='btn btn-outline navbar-toggle'
                                          onClick={() => this.props.toggleOverlaySidebarOpen(!this.props.overlaySidebarOpen)}
                                          ref={ref => { sidebarTriggerRef = ref }}
                                        >
                                            <i className='fa fa-fw fa-bars text-black'></i>
                                        </button>
                                    </div>
                                )
                            }
                        </Navbar.Header>

                        <OutsideClick
                          onClickOutside={() => {
                            this.props.toggleNavbarExpanded(false)
                          }}
                          excludedElements={[navbarTriggerRef]}
                        >
                            <Navbar.Collapse>
                                {}
                                { /*
                                    !this.props.sidebarEnabled && (
                                        <Navbar.Menu currentPath={ this.props.location.pathname }>
                                            <Row>
                                                <Col sm={ 2 } xs={ 6 }>
                                                    <Navbar.MenuSection slug='start' />
                                                    <Navbar.MenuSection slug='widgets' />
                                                    <Navbar.MenuSection slug='tables' />
                                                </Col>
                                                <Col sm={ 2 } xs={ 6 }>
                                                    <Navbar.MenuSection slug='layouts' />
                                                    <Navbar.MenuSection slug='graphs' />
                                                </Col>
                                                <Col sm={ 2 } xs={ 6 }>
                                                    <Navbar.MenuSection slug='interface' />
                                                    <Navbar.MenuSection slug='grids' />
                                                </Col>
                                                <Col sm={ 2 } xs={ 6 }>
                                                    <Navbar.MenuSection slug='pages' />
                                                    <Navbar.MenuSection slug='forms' />
                                                    <Navbar.MenuSection slug='tasks' />
                                                </Col>
                                                <Col sm={ 2 } xs={ 6 }>
                                                    <Navbar.MenuSection slug='projects' />
                                                    <Navbar.MenuSection slug='files-manager' />
                                                    <Navbar.MenuSection slug='search' />
                                                    <Navbar.MenuSection slug='mailbox' />
                                                </Col>
                                                <Col sm={ 2 } xs={ 6 }>
                                                    <Navbar.MenuSection slug='users' />
                                                    <Navbar.MenuSection slug='user-profile' />
                                                    <Navbar.MenuSection slug='apps' />
                                                    <Navbar.MenuSection slug='icons' />
                                                </Col>
                                            </Row>
                                        </Navbar.Menu>
                                    )
                                    */ }
                                <Nav>
                                    {
                                        this.props.sidebarEnabled && this.props.currentScreenSize !== SCREEN_SIZE_XS && (
                                            <NavItem
                                              onClick={() => this.toggleSidebarSlim()}
                                            >
                                                <i className="fa fa-lg fa-bars"></i>
                                            </NavItem>
                                        )
                                    }
                                    {}
                                </Nav>

                                {}
                                <Nav pullRight>
                                  { /* isClient && (
                                    <NavItem>
                                    </NavItem>
                                    )
                                    */ }
                                  {}
                                  {}
                                  {}
                                  {
                                    isClient && (
                                      <NavDropdown
                                        title={
                                          <div className={classes.buttonUser}>
                                            <span className="m-r-1 v-a-m">
                                              {fullName}
                                            </span>
                                            <AvatarImage
                                              size='small'
                                              src={this.props.profile.avatar}
                                              style={{
                                                width: '19px',
                                                height: '19px'
                                              }}
                                            />
                                          </div>
                                          }
                                        id="user-profile-dropdown"
                                        eventKey={3}
                                        >
                                          <MenuItem
                                            header
                                            className='text-uppercase hidden-xs'
                                          >
                                            <strong className='text-gray-lighter'>
                                              Account
                                            </strong>
                                          </MenuItem>
                                          <MenuItem divider className='hidden-xs' />
                                          <LinkContainer to='/dashboard'>
                                            <MenuItem eventKey={3.1}>Home</MenuItem>
                                          </LinkContainer>
                                          <LinkContainer to='/dashboard/account'>
                                            <MenuItem eventKey={3.3}>Account</MenuItem>
                                          </LinkContainer>
                                          <LinkContainer to='/dashboard/privacy'>
                                            <MenuItem eventKey={3.4}>Privacy</MenuItem>
                                          </LinkContainer>
                                          <LinkContainer to='/dashboard/feedback'>
                                          <MenuItem eventKey={3.5}>Feedback</MenuItem>
                                        </LinkContainer>
                                          <LinkContainer to='/terms-of-service'>
                                          <MenuItem eventKey={3.5}>Terms Of Service</MenuItem>
                                        </LinkContainer>
                                        <LinkContainer to='/privacy-policy'>
                                          <MenuItem eventKey={3.6}>Privacy Policy</MenuItem>
                                        </LinkContainer>
                                          <MenuItem onClick={this.openFaqTab} eventKey={3.7}>FAQ</MenuItem>
                                          <MenuItem divider />
                                          <LinkContainer to='/login'>
                                            <MenuItem onClick={this.handleLogout} eventKey={3.6}>Sign Out</MenuItem>
                                          </LinkContainer>
                                        </NavDropdown>
                                        )
                                  }
                                  {
                                    isAdmin && (
                                      <NavDropdown
                                        title={
                                          <div className={classes.buttonUser}>
                                            <span className="m-r-1 v-a-m">
                                              {fullName}
                                            </span>
                                          </div>
                                          }
                                        id="user-profile-dropdown"
                                        eventKey={3}
                                        >
                                          <MenuItem
                                            header
                                            className='text-uppercase hidden-xs'
                                          >
                                            <strong className='text-gray-lighter'>
                                              Account
                                            </strong>
                                          </MenuItem>
                                          <MenuItem divider className='hidden-xs' />
                                          <LinkContainer to='/login'>
                                            <MenuItem onClick={this.handleLogout} eventKey={3.4}>Sign Out</MenuItem>
                                          </LinkContainer>
                                        </NavDropdown>
                                    )
                                  }
                                { /*
                                    <NavItem
                                        onClick={ () => this.props.toggleRightSidebar() }
                                        className='hidden-xs'
                                        ref='rightSidebarToggler'
                                    >
                                        <i className="fa fa-lg fa-align-right"></i>
                                    </NavItem>
                                */ }
                                </Nav>
                            </Navbar.Collapse>
                        </OutsideClick>
                    </Navbar>

                    <OutsideClick
                      active={this.props.currentScreenSize === SCREEN_SIZE_XS}
                      onClickOutside={() => { this.props.toggleOverlaySidebarOpen(false) }}
                      excludedElements={[sidebarTriggerRef]}
                    >
                      <Sidebar
                        className='p-b-3'
                        affixOffset={this.props.navbarEnabled ? 50 : 0}
                        overlay={this.props.currentScreenSize === SCREEN_SIZE_XS}
                        overlayVisible={this.props.overlaySidebarOpen}
                        header={(
                          <div>
                            <img src={sidebarOverlayLogo} width={90} alt="Logo" />
                            <a
                              href="javascript:void(0)"
                              className="sidebar-switch"
                              onClick={() => this.props.toggleOverlaySidebarOpen(false)}
                            >
                              <i className="fa fa-times"></i>
                            </a>
                          </div>
                          )}
                        >
                          {}
                          <SidebarAddOns.AvatarAndStatsAddOn
                            avatar={this.props.profile.avatar}
                            fullName={fullName}
                            colorSidebar={this.props.sidebarSkin === SKIN_COLOR}
                          />
                          <Sidebar.Menu
                            currentUrl={this.props.location.pathname}
                            sidebarConfigs={this.state.sidebarConfigs}
                          />
                        </Sidebar>
                      </OutsideClick>
                    </Layout.Navigation>

                {
                    // RawContent - displays the content directly without the header nor container
                    this.props.rawContent ? (
                        <Layout.Content>
                            {this.props.children}
                        </Layout.Content>
                    ) : (
                    <Layout.Content
                      style={{ paddingTop: !this.props.headerEnabled ? '19px' : '0' }}
                    >
                            <Header
                              style={this.props.headerStyle}
                              fluid={this.props.contentView !== CONTENT_VIEW_STATIC}
                              currentUrl={this.props.location.pathname}
                              sidebarConfigs={this.state.sidebarConfigs}
                              currentUser={this.props.currentUser}
                            />
                            <Grid fluid={this.props.contentView !== CONTENT_VIEW_STATIC}>
                                {this.props.children}
                            </Grid>
                        </Layout.Content>
                    )
                }

                { /*
                     <OutsideClick
                    excludedElements={ [rightSidebarTriggerRef] }
                    onClickOutside={
                        () => {
                            if(this.props.rightSidebarEnabled) {
                                this.props.toggleRightSidebar(false);
                            }
                        }
                    }
                >
                    <RightSidebar
                        affixOffset={ this.props.navbarEnabled ? 50 : 0 }
                        active={ this.props.rightSidebarEnabled }
                    >
                        <Tabs
                            defaultActiveKey={ 1 }
                            onSelect={this.handleSelect}
                            id="controlled-tab-example"
                            bsStyle='highlight'
                            className='m-r-1 m-t-2'
                        >
                            <Tab
                                eventKey={ 1 }
                                title={
                                    <span className="fa fa-calendar-o"></span>
                                }
                            >
                                <RightSidebarTabs.First data={ rightSidebarData } />
                            </Tab>

                            <Tab
                                eventKey={ 2 }
                                title={
                                    <span className="fa fa-area-chart"></span>
                                }
                            >
                                <RightSidebarTabs.Second data={ rightSidebarData } />
                            </Tab>

                            <Tab
                                eventKey={ 3 }
                                title={
                                    <span className="fa fa-users"></span>
                                }
                            >
                                <RightSidebarTabs.Third data={ rightSidebarData.Chat } />
                            </Tab>

                            <Tab
                                eventKey={ 4 }
                                title={
                                    <span className="fa fa-list"></span>
                                }
                            >
                                <RightSidebarTabs.Fourth />
                            </Tab>

                            <Tab
                                eventKey={ 5 }
                                title={
                                    <span className="fa fa-gear"></span>
                                }
                            >
                                <RightSidebarTabs.Fifth />
                            </Tab>
                        </Tabs>
                    </RightSidebar>
                </OutsideClick>
                */ }

                {}

                <Footer fluid={!staticFootNavContainer} className={footerClass}>
                  { this.props.currentScreenSize !== SCREEN_SIZE_XS &&
                    <p className="text-gray-dark pull-right">
                      <span className="text-gray-dark p-r-1"><strong className="m-r-1">Need Help?</strong></span>
                      <i className="fa fa-phone m-r-1" aria-hidden="true"></i>
                      <span className='m-r-1'>
                        {infosweepPhoneNumber}
                      </span>
                      <i className="fa fa-envelope m-r-1" aria-hidden="true"></i>
                      <span className='m-r-3'>
                        {infosweepEmail}
                      </span>
                    </p>
                  }
                    <p className='text-center'>
                    </p>
                    <p className="text-gray-dark">
                      © 2017 <strong>InfoSweep </strong>
                      <span className={footerAddressClass}>
                        {infosweepAddress} USA. All rights reserved.
                      </span>
                    </p>
                  </Footer>

                <Notifications
                  notifications={this.props.notifications}
                />
            </Layout>
        )
  };
}

const mapStateToProps = (state) => ({
  navbarEnabled: state.layout.navbarEnabled,
  navbarFixed: state.layout.navbarFixed,
  navbarExpanded: state.layout.navbarExpanded,
  navbarSkin: state.layout.navbarSkin,
  sidebarEnabled: state.layout.sidebarEnabled,
  sidebarStyle: state.layout.sidebarStyle,
  sidebarFixed: state.layout.sidebarFixed,
  sidebarAside: state.layout.sidebarAside,
  sidebarAddon: state.layout.sidebarAddon,
  sidebarSkin: state.layout.sidebarSkin,
  overlaySidebarOpen: state.layout.overlaySidebarOpen,
  contentView: state.layout.contentView,
  footerEnabled: state.layout.footerEnabled,
  footerFixed: state.layout.footerFixed,
  rightSidebarEnabled: state.layout.rightSidebarEnabled,
  headerStyle: state.layout.headerStyle,
  headerEnabled: state.layout.headerEnabled,
  currentScreenSize: state.layout.currentScreenSize,
  skinColor: state.layout.skinColor,
  rawContent: state.layout.rawContent,
  notifications: state.notifications,
  currentUser: state.currentUser,
  profile: state.account.profile
})

const mapActionCreators = {
  setSidebarStyle,
  toggleRightSidebar,
  toggleOverlaySidebarOpen,
  toggleNavbarExpanded,
  setCurrentScreenSize,
  changeSidebarAddOn,
  logout
}

export default connect(mapStateToProps, mapActionCreators)(DefaultLayout)
