import React from 'react';

import {
  Row,
  Panel,
  Col,
  Button,
  ButtonGroup,
  OverlayTrigger,
  ListGroup,
  ListGroupItem,
  Tooltip
} from 'components';
import classes from '../dashboard.scss';


const KeywordSummary = ({ keywords, showModal, handleKeywordEdit }) => (
      <ListGroup>
        <ListGroupItem active>
          Your Search Phrases
          <OverlayTrigger
            placement='top'
            overlay={(
              <Tooltip>
                info
              </Tooltip>
              )}
            >
              <Button
                className={classes.infoButton}
                bsStyle='link'
              >
                <i className='fa fa-question fa-fw fa-lg text-white'></i>
              </Button>
            </OverlayTrigger>
          </ListGroupItem>
        {
          keywords.map( (keyword, i) => (
            <ListGroupItem key={i} className={classes.keywords} style={{background: 'none'}}>
              { keyword.label }
              <ButtonGroup
                className='pull-right'
              >
                <OverlayTrigger
                  placement='top'
                  overlay={(
                    <Tooltip>
                      Search
                    </Tooltip>
                    )}
                  >
                    <Button
                      bsSize='small'
                    >
                        <i className='fa fa-search fa-fw fa-lg text-gray-lighter'></i>
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement='top'
                    overlay={(
                      <Tooltip>
                        Edit
                      </Tooltip>
                      )}
                    >
                      <Button
                        onClick={() => { showModal('KEYWORD', keyword, handleKeywordEdit) }}
                        bsSize='small'
                      >
                        <i className='fa fa-pencil fa-fw fa-lg text-gray-lighter'></i>
                      </Button>
                    </OverlayTrigger>
                  </ButtonGroup>
                </ListGroupItem>
                ))
        }
      </ListGroup>
)

export default KeywordSummary;
          //<Col lg={ 3 } sm={ 6 } key={ keyword.id }>
            //<Panel
              //className={ classes.keywordSummaryPanel }
              //header={
                //<div className='flex-space-between'>
                  //<ButtonGroup
                    //bsSize='xs'
                  //>
                    //<OverlayTrigger
                      //placement='top'
                      //overlay={(
                        //<Tooltip id='option-collapse'>
                          //Search
                        //</Tooltip>
                        //)}
                      //>
                        //<Button bsStyle='link'>
                          //<i className='fa fa-search fa-fw fa-lg text-gray-lighter'></i>
                        //</Button>
                      //</OverlayTrigger>
                      //<OverlayTrigger
                        //placement='top'
                        //overlay={(
                          //<Tooltip id='option-delete'>
                            //Edit
                          //</Tooltip>
                          //)}
                        //>
                          //<Button
                            //onClick={() => { showModal('KEYWORD', keyword, handleKeywordEdit) }}
                            //bsSize='small'
                            //bsStyle='link'
                          //>
                            //<i className="fa fa-pencil fa-fw fa-lg text-gray-lighter"></i>
                          //</Button>
                        //</OverlayTrigger>
                      //</ButtonGroup>
                    //</div>
              //}
            //>
              //<div className='text-center'>
                //{keyword.label}
              //</div>
            //</Panel>
          //</Col>
