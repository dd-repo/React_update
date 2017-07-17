import React from 'react';

import {
  ListGroup,
  ListGroupItem,
  Label,
  Button
} from 'components'

import classes from '../../user.scss';

const Keywords = ({keywords, showModal}) => (
  <div>
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
            <Button
              onClick={() => { showModal('KEYWORD', keyword) }}
              bsSize='small'
              bsStyle='link'
            >
              <i className="fa fa-pencil"></i> Edit
            </Button>
          </ListGroupItem>
          ))
      }
    </ListGroup>
  </div>
)

export default Keywords;
