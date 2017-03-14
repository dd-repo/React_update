import React, { PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';

import {
    Col as BootstrapCol
} from 'components';

import classes from './../Float.scss';

class Col extends React.Component {
    static propTypes = {
        active: PropTypes.bool,

        lg: PropTypes.number,
        md: PropTypes.number,
        sm: PropTypes.number,
        xs: PropTypes.number,

        children: PropTypes.node
    }

    render() {
        const { active, children, className } = this.props;
        const bsColumnProps = _.pick(this.props, ['lg', 'md', 'sm', 'xs']);
        const otherProps = _.omit(this.props, ['lg', 'md', 'sm', 'xs']);

        const floatColClasses = classNames(className, classes.floatCol);

        return (
            active ? (
                <div { ...otherProps } className={ floatColClasses }>
                    { children }
                </div>
            ) : (
                <BootstrapCol { ...(_.extend(bsColumnProps, otherProps)) } className={ className }>
                    { children }
                </BootstrapCol>
            )
        );
    }
}

export default Col;
