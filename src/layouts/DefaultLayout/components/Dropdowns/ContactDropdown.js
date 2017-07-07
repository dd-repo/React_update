import React from 'react';
import { Link } from 'react-router';
import _ from 'underscore';

import {
  NavDropdown,
  Label,
  ListGroup,
  ListGroupItem,
  Media,
  Button,
  Navbar,
  AvatarImage
} from 'components';

const contacts = [
  { id: 1, icon: <i className="fa fa-phone" aria-hidden="true"></i>, info: '(844) 641-7829' },
  { id: 2, icon: <i className="fa fa-envelope-o" aria-hidden="true"></i>, info: 'help@clickadilly.com' }
]

class ContactDropdown extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  render() {
    return (
      <NavDropdown
        id='navbar-contact'
        noCaret
        open={ this.state.open }
        onToggle={ () => this.setState({ open: !this.state.open }) }
        title={
          <span>
            <span className='hidden-xs'>
              Need Help?
            </span>
          </span>

          }
        >
          <Navbar.DropdownList
            header={
              <div>
                <strong className='small text-uppercase'>
                  Contact
                </strong>
              </div>
              }
              >
                <ListGroup>
                  {
                    _.map(contacts, contact => (
                      <ListGroupItem key={ contact.id }>
                          <Media>
                            <Media.Left align='middle'>
                              { contact.icon }
                            </Media.Left>
                            <Media.Body>
                              <p className='m-b-1'>
                                <span className='text-white'>
                                  { contact.info }
                                </span>
                              </p>
                            </Media.Body>
                          </Media>
                      </ListGroupItem>
                      ))
                  }
                </ListGroup>
              </Navbar.DropdownList>
            </NavDropdown>
    )
  }
}

export default ContactDropdown;
