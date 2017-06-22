import React from 'react';

import {
  ListGroup,
  ListGroupItem,
  Label,
} from 'components'

import classes from '../../user.scss';

const Keywords = ({keywords}) => (
  <ListGroup className={ classes.taskDetails }>
    {
      keywords.map((keyword, i) => (
        <ListGroupItem className='flex-space-between' key={i}>
          <h5 className={ classes.detailsKey }>
            Keyword { i + 1 }
          </h5>
          <div className={ classes.detailsValue }>
            { keyword.value }
          </div>
        </ListGroupItem>
        ))
    }
  </ListGroup>
)

export default Keywords;
