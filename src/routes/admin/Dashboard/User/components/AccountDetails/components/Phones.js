import React from 'react';

import {
  ListGroup,
  ListGroupItem,
  Label,
} from 'components'

import classes from '../../user.scss';
import { normalizePhone } from 'utils/formHelpers';

const Phones = ({phones}) => (
  <ListGroup className={ classes.taskDetails }>
    {
      phones.map((phone, i) => (
        <ListGroupItem className='flex-space-between' key={i}>
          <h5 className={ classes.detailsKey }>
            Phone Number { i + 1 }
          </h5>
          <div className={ classes.detailsValue }>
            { normalizePhone(phone.phone_number) }
          </div>
        </ListGroupItem>
        ))
    }
  </ListGroup>
)

export default Phones;

