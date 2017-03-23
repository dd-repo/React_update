import React, { PropTypes } from 'react';
import uid from 'node-uuid';
import hash from 'object-hash';
import _ from 'underscore';
import numeral from 'numeral';

import {
    Row,
    Col,
    Table,
    Panel,
    Button,
    Label,
    Divider
} from 'components';

import { Colors } from 'consts';

import classes from './PricingTables.scss';

const tablesData = [
    {
        id: uid.v4(),
        type: 'Individual',
        bsStyle: 'info',
        description: 'Individual Plan',
        price: 29.00,
        capabilities: [
            { key: 'Monitors Google'},
            { key: 'Alerts You To New Results'},
            { key: 'Removes Your Private Information'},
            { key: 'Protects One Individual'}
        ],
        active: true
    },
    {
        id: uid.v4(),
        type: 'Family',
        bsStyle: 'primary',
        description: 'Family Plan',
        price: 49.00,
        capabilities: [
            { key: 'Monitors Google'},
            { key: 'Alerts You To New Results'},
            { key: 'Removes Your Private Information'},
            { key: 'Protects Up To 4 Family Members'},
        ],
        active: true
    },
];

const typeToColor = style => {
    switch(style) {
        case 'info':
            return Colors.brandInfo;
        case 'primary':
            return Colors.brandPrimary;
        case 'warning':
            return Colors.brandWarning;
        case 'danger':
            return Colors.brandDanger;
    }
}

const PricingTableClean = props => (
    <div className={ classes.tableClean }>
        <Label outline bsStyle={ props.bsStyle }>
            { props.type }
        </Label>
        <div>
            <p className={ classes.price }>
                ${ numeral(props.price).format('0.00') }
            </p>
            <p>
                / month
            </p>
        </div>
        <Divider textPosition='center'>
            Description
        </Divider>
        <p className={ classes.description }>
            { props.description }
        </p>
        <Divider textPosition='center'>
            Capabilities
        </Divider>
        <Table className={ classes.capabilitiesTable }>
            <tbody>
                {
                    _.map(props.capabilities, capability => (
                        <tr key={ hash(capability) }>
                            <td>
                                { capability.key }
                            </td>
                            <td>
                                { capability.value }
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
        {
            (props.active ? (
                <Button onClick={props.handleClick.bind(null, props.type, props.price) } bsStyle='primary'>
                    <i className='fa fa-check m-r-1'></i>
                    Signup
                </Button>
            ) : (
                <Button block>
                    Upgrade
                </Button>
            ))
        }
    </div>
);

const PricingTable = props => (
    <Panel
        header={
            <div
                className={ classes.header }
                style={ { backgroundColor: typeToColor(props.bsStyle) } }
            >
                <Label outline bsStyle='custom' customColor={ Colors.brandWhite }>
                    { props.type }
                </Label>
                <div>
                    <p className={ classes.price }>
                        ${ numeral(props.price).format('0.00') }
                    </p>
                    <p>
                        / month
                    </p>
                </div>
            </div>
        }
    >
        <Divider>
            Description
        </Divider>
        <p className={ classes.description }>
            { props.description }
        </p>
        <Divider>
            Capabilities
        </Divider>
        <Table className={ classes.capabilitiesTable }>
            <tbody>
                {
                    _.map(props.capabilities, capability => (
                        <tr key={ hash(capability) }>
                            <td>
                                { capability.key }
                            </td>
                            <td>
                                { capability.value }
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
        <Button block>
            Upgrade
        </Button>
    </Panel>
);

PricingTable.propTypes = PricingTableClean.propTypes = {
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    bsStyle: PropTypes.string.isRequired,
    capabilities: PropTypes.array.isRequired,
    active: PropTypes.bool,
    handleClick: PropTypes.func.isRequired
};

const PricingTables = props => {
  return (
    <Row>
      <Col lg={ 12 } mdOffset={2}>
        <Row>
          {
            _.map(tablesData, data => (
              <Col md={ 4 } key={ hash(data) }>
                <PricingTableClean handleClick={props.handleClick} {...data} />
              </Col>
              ))
          }
        </Row>
      </Col>
    </Row>
  );
}

export default PricingTables
