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
    this._handleEditButton = this._handleEditButton.bind(this);
  }

  _onClick(e) {
    this.setState({tabKey: e.target.innerText})
  }

  _handleEditButton(value = this.getValue()) {
    this.props.toggleModal(this.formatSelector(this.state.tabKey), true, value)
  }

  formatSelector(selector) {
    if(selector === 'Addresses') {
      return 'address'
    } else {
      return selector.replace(/s$/, '').toLowerCase()
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
          header={
            <h4 className='panel-title'>
              Account Details
            </h4>
            }
            footer={
              <div>
                <DropdownButton
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
                  {
                    (tabKey === 'Account' || tabKey === 'Profile') &&
                      <span className='pull-right'>
                        <Button onClick={() => {this._handleEditButton()}} bsStyle='primary'>
                          <i className="fa fa-pencil"></i> Edit {this.state.tabKey}
                        </Button>
                      </span>
                      }
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
                          handleEdit={this._handleEditButton}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey='addresses'>
                        <Addresses
                          addresses={account.addresses || []}
                          handleEdit={this._handleEditButton}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey='phones'>
                        <Phones
                          phones={account.phones || []}
                          handleEdit={this._handleEditButton}
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
