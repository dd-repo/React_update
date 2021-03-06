import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';

import {
    Row,
    Col,
    Panel,
    Button,
    Media,
    Tabs,
    Tab,
    Nav,
    NavItem,
    Badge,
    AvatarImage,
    FavoriteStar,
    Divider,
} from 'components';
import ProfileDetails from './ProfileDetails';

import { Colors } from 'consts';

import classes from '../../profile.scss';

class Profile extends Component {
  constructor(props) {
    super(props)

    this.renderUser = this.renderUser.bind(this);
  }

  renderUser() {
    const { first_name, last_name } = this.props.currentUser
    const { avatar } = this.props.profile
    return (
      <div className={ classes.userDetails }>
        <Media>
          <Media.Left align='middle'>
            <AvatarImage
              src={ avatar }
              size='large'
              statusPlacement='bottom'
            />
          </Media.Left>
          <Media.Body>
            <div className={ classes.userPanelName }>
              <h4>
              { first_name } {last_name}
              </h4>
            </div>
            <div>
              { ' ' }
              <LinkContainer to='/dashboard/user-profile/edit'>
                <Button bsStyle='primary' href='javascript:;'>
                  Edit Profile
                </Button>
              </LinkContainer>
              { ' ' }
            </div>
          </Media.Body>
        </Media>
      </div>
    )
  }

  render() {
    return (
      <Row>
        <Col lg={ 4 }>
          { this.renderUser() }
        </Col>
        <Col lg={ 8 }>
          <ProfileDetails
            profile={this.props.profile}
          />
        </Col>
      </Row>
    )
  }
}

export default Profile;
