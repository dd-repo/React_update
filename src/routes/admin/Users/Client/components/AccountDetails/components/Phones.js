import React from 'react';

import {
  ListGroup,
  ListGroupItem,
  Label,
  Button
} from 'components'

import classes from '../../user.scss';
import { normalizePhone } from 'utils/formHelpers';

const Phones = ({phones, showModal}) => (
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
          <Button
            onClick={() => { showModal('PHONE', phone) }}
            bsSize='small'
            bsStyle='link'
          >
            <i className="fa fa-pencil"></i> Edit
          </Button>
        </ListGroupItem>
        ))
    }
  </ListGroup>
)

export default Phones;

