import React from 'react';
import PropTypes from 'prop-types';

import {
  ListGroupItem,
  Button
} from 'components';
import classes from '../Keywords/keywords.scss'

const Keyword = ({keyword, index}) => (
  <ListGroupItem className='flex-space-between'>
    <h5 className={ classes.detailsKey }>
      Keyword { index + 1 }
    </h5>
    <div className={ classes.detailsValue }>
      { keyword.label }
    </div>
    <Button
      onClick={() => { showModal('KEYWORD', keyword) }}
      bsSize='small'
      bsStyle='link'
    >
      <i className="fa fa-pencil"></i> Edit
    </Button>
  </ListGroupItem>
)

Keyword.propTypes = {
  keyword: PropTypes.object,
  showModal: PropTypes.func
}

export default Keyword;
