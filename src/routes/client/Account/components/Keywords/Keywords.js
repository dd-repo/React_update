import React, { PropTypes } from 'react';

import {
  Panel,
  Button,
  ListGroup,
  ListGroupItem,
} from 'components'

import Keyword from '../Keyword';
import classes from './keywords.scss';

const Keywords = props => {
  const {
    keywords,
    showModal,
    handleKeywordEdit
  } = props

    return (
      <Panel
        header={
          <h4 className='panel-title'>
            Keywords
          </h4>
          }
        >
          <div className={ classes.mainWrap} >
            <ListGroup className={ classes.taskDetails }>
              {
                keywords.map((keyword, index) => (
                  <ListGroupItem className='flex-space-between' key={index}>
                    <h5 className={ classes.detailsKey }>
                      Keyword { index + 1 }
                    </h5>
                    <div className={ classes.detailsValue }>
                      { keyword.label }
                    </div>
                    <Button
                      onClick={() => { showModal('KEYWORD', keyword, handleKeywordEdit) }}
                      bsSize='small'
                      bsStyle='primary'
                    >
                      <i className="fa fa-pencil"></i> Edit
                    </Button>
                  </ListGroupItem>
                  ))
              }
            </ListGroup>
          </div>
        </Panel>
    );
}

Keywords.propTypes = {
  keywords: PropTypes.array,
  showModal: PropTypes.func
}

export default Keywords;

