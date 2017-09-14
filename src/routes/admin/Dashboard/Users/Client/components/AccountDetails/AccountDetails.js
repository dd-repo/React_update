import React, { PropTypes } from 'react';

import {
  Panel,
  DropdownButton,
  MenuItem,
  Button,
  ListGroup,
  ListGroupItem,
  Label,
  Tab,
  Nav,
  NavItem,
} from 'components'

import Account from './components/Account';
import Keywords from './components/Keywords';
import Addresses from './components/Addresses';
import Phones from './components/Phones';
import Profile from './components/Profile';
import { formatDate } from 'utils';
import classes from '../user.scss';

const MODAL_TYPE = {
  'Account': 'ACCOUNT',
  'Addresses': 'CREATE_ADDRESS',
  'Keywords': 'KEYWORD',
  'Phones': 'PHONE',
  'Profile': 'PROFILE'
}

const SINGULAR_RESOURCE = {
  'Keywords': 'Keyword',
  'Addresses': 'Address'
}

class AccountDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {tabKey: 'Account'}

    this._onClick = this._onClick.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  _onClick(e) {
    this.setState({tabKey: e.target.innerText})
  }

  _handleClick(e) {
    const text = e.target.innerText
    const { tabKey } = this.state
    const { showModal, handleKeywordSubmit } = this.props

    if(text.includes('Keyword')) {
      showModal('KEYWORD', {}, handleKeywordSubmit)
    } else {
      showModal(MODAL_TYPE[tabKey])
    }
  }

  getValue() {
    if(this.state.tabKey == 'Account') {
      return this.props.account
    }
    if(this.state.tabKey === 'Profile') {
      return this.props.profile
    }
  }

  render() {
    const {
        accounts,
        account,
        keywords,
        addresses,
        profile,
        phones,
        fetchAccount
    } = this.props

    const { tabKey } = this.state

    return (
        <Panel
          maxHeight={312}
          header={
            <h4 className='panel-title'>
              Account Details
            </h4>
            }
            footer={
              <div>
                <DropdownButton
                  dropup
                  bsStyle='primary'
                  onSelect={(id) => fetchAccount(id)}
                  title={
                    <span>
                      <span className='m-x-1'>
                        Accounts
                      </span>
                    </span>
                    }
                    id='dropdown-accounts-select'
                  >
                    {
                      accounts.map(account => (
                        <MenuItem eventKey={account.id} key={account.id}>
                          { `${account.first_name} ${account.last_name}` }
                        </MenuItem>
                        ))
                    }
                  </DropdownButton>
                      <span className='pull-right'>
                  {
                    (tabKey === 'Account' || tabKey === 'Profile') &&
                      <Button
                        onClick={() => {this.props.showModal(MODAL_TYPE[this.state.tabKey], this.getValue())}}
                        bsStyle='primary'>
                          <i className="fa fa-pencil"></i> Edit {this.state.tabKey}
                        </Button>
                      }

                      {
                        (tabKey === 'Keywords' || tabKey === 'Addresses') &&
                          <Button
                            onClick={this._handleClick}
                            bsStyle='success'
                          >
                            Add {SINGULAR_RESOURCE[this.state.tabKey]} <i className='fa fa-plus fa-lg'></i>
                          </Button>

                          }
                        </span>
                      </div>
                      }
                    >
                      <Tab.Container id="profile-tabs" defaultActiveKey="overview">
                        <div>
                          <Nav onClick={this._onClick} bsStyle='tabs'>
                            <NavItem eventKey='overview'>
                              Account
                            </NavItem>
                            <NavItem eventKey='keywords'>
                              Keywords
                            </NavItem>
                            <NavItem eventKey='addresses'>
                              Addresses
                            </NavItem>
                            <NavItem eventKey='phones'>
                              Phones
                            </NavItem>
                            <NavItem eventKey='profile'>
                              Profile
                            </NavItem>
                          </Nav>
                          <Tab.Content animation>
                            <Tab.Pane eventKey='overview'>
                              <Account account={account} />
                            </Tab.Pane>
                            <Tab.Pane eventKey='keywords'>
                              <Keywords
                                keywords={keywords}
                                showModal={this.props.showModal}
                                handleKeywordSubmit={this.props.handleKeywordSubmit}
                              />
                            </Tab.Pane>
                            <Tab.Pane eventKey='addresses'>
                              <Addresses
                                addresses={addresses}
                                showModal={this.props.showModal}
                              />
                            </Tab.Pane>
                            <Tab.Pane eventKey='phones'>
                              <Phones
                                phones={phones}
                                showModal={this.props.showModal}
                              />
                            </Tab.Pane>
                            <Tab.Pane eventKey='profile'>
                              <Profile profile={profile} />
                            </Tab.Pane>
                          </Tab.Content>
                        </div>
                      </Tab.Container>
                    </Panel>
    );
  }
}

AccountDetails.propTypes = {
  client: PropTypes.object,
  account: PropTypes.object,
  accounts: PropTypes.array,
  fetchAccount: PropTypes.func,
  toggleModal: PropTypes.func
}

export default AccountDetails;
