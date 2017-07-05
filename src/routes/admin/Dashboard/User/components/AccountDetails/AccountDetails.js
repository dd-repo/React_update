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
import { formatDate } from 'utils/dateHelper';
import classes from '../user.scss';

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

  _handleClick(value = {}, type) {
    this.props.toggleModal(this.getModalName(this.state.tabKey, type), true, value)
  }

  getModalName(selector, type) {
    if(type === 'edit') {
      if(selector === 'Addresses') {
        return 'addressEditModal'
      } else {
        const formattedSelector = selector.replace(/s$/, '').toLowerCase()
        return `${formattedSelector}EditModal`
      }
    }else{
      const formattedSelector = selector.replace(/s$/, '')
      return `new${formattedSelector}Modal`
    }
  }

  getValue() {
    if(this.state.tabKey == 'Account') {
      return this.props.account
    }
    if(this.state.tabKey === 'Profile') {
      return this.props.account.profile
    }
  }

  render() {

    const {isFetching, accounts, account, fetchAccount } = this.props
    const { tabKey } = this.state

    return (
      !isFetching &&
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
                        onClick={() => {this._handleClick(this.getValue(), 'edit')}}
                        bsStyle='primary'>
                          <i className="fa fa-pencil"></i> Edit {this.state.tabKey}
                        </Button>
                      }

                      {
                        (tabKey === 'Keywords') &&
                          <Button
                            onClick={() => {this._handleClick({}, 'new') }}
                            bsStyle='success'
                          >
                            Add Keyword <i className='fa fa-plus fa-lg'></i>
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
                          keywords={account.keywords || []}
                          handleClick={this._handleClick}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey='addresses'>
                        <Addresses
                          addresses={account.addresses || []}
                          handleClick={this._handleClick}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey='phones'>
                        <Phones
                          phones={account.phones || []}
                          handleClick={this._handleClick}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey='profile'>
                        <Profile profile={account.profile || {}} />
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container>
              </Panel>
    );
  }
}

AccountDetails.propTypes = {
  account: PropTypes.object,
  accounts: PropTypes.array,
  fetchAccount: PropTypes.func,
  toggleModal: PropTypes.func
}

export default AccountDetails;
