import React, { PropTypes } from 'react';
import _ from 'underscore';
import {
    WidthProvider,
    Responsive
} from 'react-grid-layout';

import {
    Row as BootstrapRow
} from 'components';

const responsiveBreakpoints = {
    lg: 1169, md: 969, sm: 749, xs: 0
};

const reactGridLayoutProps = ['rowHeight'];

class Row extends React.Component {
    static propTypes = {
        active: PropTypes.bool,
        children: PropTypes.node
    };

    constructor(props, context) {
        super(props, context);

        this.ResponsiveGrid = WidthProvider(Responsive);


        window.addEventListener('resize', () => { console.log('kutas') })
    }

    calcColumns(children) {
        const columns = { lg: 12, md: 12, sm: 12, xs: 12 };

        const getMinCol = (children, colKey) => {
            const colValues = React.Children.map(children, child => child.props[colKey] || 12);
            const minColValue = _.min(colValues);

            return minColValue;
        };

        _.keys(columns).forEach(colKey => {
            let lowestColVal = getMinCol(children, colKey);
            let normalizedCols = React.Children.map(children, child => (child.props[colKey] || 12) / lowestColVal);
            let normalizedColsOk = _.reduce(normalizedCols, (col, memo) => memo && (col % 1 === 0), true);

            if(normalizedColsOk) {
                columns[colKey] = 12 / lowestColVal;
            }
        });

        return columns;
    }

    calcLayout(children, columns) {
        const childArr = React.Children.toArray(children);
        const layout = { };

        _.keys(columns).forEach(colName => {
            const colValue = columns[colName];
            const currentLayout = [];

            childArr.forEach((child, index) => {
                const prevItem = currentLayout.length > 0 ? currentLayout[index - 1] : null;
                const prevWidth = prevItem ? prevItem.x + prevItem.w : 0;
                const prevY = prevItem ? prevItem.y : 0;

                const childWidth = (child.props[colName] || 12);
                const childWidthNormalized = childWidth * (colValue / 12);

                let x = prevWidth;
                // Correct if target x will be larger then max columns available
                x = x >= colValue ? 0 : x;

                currentLayout.push({
                    i: child.key,
                    // Correct if target x will be larger then max columns available
                    x: x >= colValue ? 0 : x,
                    y: x >= colValue ? prevY + 1 : prevY,
                    w: childWidthNormalized,
                    h: 1,
                    minH: 1
                });
            });

            layout[colName] = currentLayout;
        });

        return layout;
    }

    areChildrenSameColumns(childrenA, childrenB) {
        if(childrenA.length === childrenB.length) {
            for(let i = 0; i < childrenA.length; i++) {
                const childA = childrenA[i];
                const childB = childrenB[i];

                const colsA = _.pick(childA, ['lg', 'md', 'sm', 'xs']);
                const colsB = _.pick(childB, ['lg', 'md', 'sm', 'xs']);

                if(!_.isEqual(colsA, colsB)) {
                    return false;
                }
            }
        }

        return true;
    }

    triggerResize() {
        window.dispatchEvent(new Event('resize'));
    }

    componentWillMount() {
        this.columns = this.calcColumns(this.props.children);
        this.layouts = this.calcLayout(this.props.children, this.columns);
    }

    componentWillReceiveProps(nextProps) {
        // Update layout if columns has been changed
        const currentChildren = React.Children.toArray(this.props.children);
        const nextChildren = React.Children.toArray(nextProps.children);

        if(!this.areChildrenSameColumns(currentChildren, nextChildren)) {
            this.columns = this.calcColumns(this.props.children);
            this.layouts = this.calcLayout(this.props.children, this.columns);
        }
    }

    render() {
        const { ResponsiveGrid, columns, layouts } = this;
        const { active, children } = this.props;
        const responsiveGridProps = _.pick(this.props, reactGridLayoutProps);

        const TargetElement = active ? ResponsiveGrid : BootstrapRow;
        const modifiedChildren = React.Children.map(children, child => (
            React.cloneElement(child, {
                active
            })
        ));

        // Force layout reflow after render
        setTimeout(() => {
            this.triggerResize();
        }, 0);

        return (
            active ? (
                <ResponsiveGrid
                    cols={ columns}
                    breakpoints={ responsiveBreakpoints }
                    layouts={ layouts }
                    padding={ [ 0, 0 ] }
                    margin={ [ 0, 0 ] }
                    { ...responsiveGridProps }
                >
                    { modifiedChildren }
                </ResponsiveGrid>
            ) : (
                <BootstrapRow>
                    { modifiedChildren }
                </BootstrapRow>
            )
        );
    }
}

export default Row;
