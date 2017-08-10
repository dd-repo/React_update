import React from 'react';

import { Row, Panel, Col, Divider, Button, ListGroup, ListGroupItem } from 'components';
import classes from './dashboard.scss';

const KeywordSummary = ({ keywords }) => (
  <div className={ classes.keywordSummary }>
    <div className={ classes.boxHeader }>
      <h4 className={ classes.boxHeaderTitle }>Your Keywords</h4>
    </div>
    <Row>
      {
        keywords.map( keyword => (
          <Col lg={ 3 } sm={ 6 } key={ keyword.id }>
            <Panel
              className={ classes.keywordSummaryPanel }
            >
              <h5 className='text-center'>
                {keyword.label}
              </h5>
            </Panel>
          </Col>
          ))
      }
    </Row>
  </div>
)

export default KeywordSummary;
