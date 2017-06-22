import React from 'react';

import {
  ListGroup,
  ListGroupItem,
  Label,
  Panel,
  Divider
} from 'components'

import classes from '../../user.scss';

const Addresses = ({addresses}) => (
  <div>
  {
    addresses.map((address, i) => (
      <div key={i}>
        <Divider>Address {i + 1}</Divider>
        <ListGroup className={ classes.taskDetails }>
          <ListGroupItem className='flex-space-between'>
            <h5 className={ classes.detailsKey }>
              Street
            </h5>
            <div className={ classes.detailsValue }>
              { address.address1 }
            </div>
          </ListGroupItem>
          <ListGroupItem className='flex-space-between'>
            <h5 className={ classes.detailsKey }>
              City
            </h5>
            <div className={ classes.detailsValue }>
              { address.city }
            </div>
          </ListGroupItem>
          <ListGroupItem className='flex-space-between'>
            <h5 className={ classes.detailsKey }>
              State
            </h5>
            <div className={ classes.detailsValue }>
              { address.state }
            </div>
          </ListGroupItem>
          <ListGroupItem className='flex-space-between'>
            <h5 className={ classes.detailsKey }>
              Zip
            </h5>
            <div className={ classes.detailsValue }>
              { address.zip }
            </div>
          </ListGroupItem>
        </ListGroup>
      </div>
      ))
  }
</div>
)

export default Addresses;

