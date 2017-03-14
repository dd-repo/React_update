import React from 'react';
import _ from 'underscore';
import uid from 'node-uuid';
import ReactGridLayout, {
    WidthProvider,
    Responsive
} from 'react-grid-layout';

import {
    Row,
    Col,
    Table,
    CollapsablePanel,
    Button,
    Grid,
    Header,
    FloatGrid
} from 'components';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC, SCREEN_SIZE_XS, SCREEN_SIZE_SM } from 'layouts/DefaultLayout/modules/layout';

import { Colors } from 'consts';

/*
    Timeliens from Timeline examples
*/
import TimelineExample1 from 'routes/Pages/Timeline/components/TimelineExample_VerticalInnerDate';
import TimelineExample2 from 'routes/Pages/Timeline/components/TimelineExample_Horizontal';
import TimelineExample3 from 'routes/Pages/Timeline/components/TimelineExample_Vertical';

/*
    Page specific components
*/
import {
    SummaryBox,
    Notifications,
    Emails,
    Timeline,
    Tasks,
    Reminders,
    Comments,
    Projects,
    Users,
    Attachments,
    Comments2,
    Chat
} from './components';

import {
    summaries,
    thinListWidgets,
    largeListWidgets
} from './gridDefinition';

const responsiveGridProps = {
    breakpoints: {
        lg: 1200, md: 992, sm: 768, xs: 576
    }
}

import classes from './DataWidgets.scss';

const deepClone = o => JSON.parse(JSON.stringify(o));

class DataWidgetsContainer extends RoutedComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            closedPanels: [],
            layouts: {
                summaries: deepClone(summaries),
                thinListWidgets: deepClone(thinListWidgets),
                largeListWidgets: deepClone(largeListWidgets)
            }
        };

        this.ResponsiveGridLayout = WidthProvider(Responsive);
    }
    getLayoutOptions() {
        return {
            contentView: CONTENT_VIEW_STATIC,
            rawContent: true
        }
    }

    isPanelOpen(panelId) {
        return !_.contains(this.state.closedPanels, panelId);
    }

    closePanel(panelId) {
        this.setState({
            closedPanels: [...this.state.closedPanels, panelId]
        });
    }

    componentWillUpdate(nextProps) {
        if(nextProps.contentView !== this.props.contentView) {
            requestAnimationFrame(() => {
                this.ResponsiveGridLayout = WidthProvider(Responsive);
            })
        }
    }

    changeLayout(layout, layoutName) {
        this.setState({
            layouts: {
                ...this.state.layouts,
                [`${layoutName}`]: layout
            },
            float: true
        });
    }

    resetLayout() {
        this.setState({
            layouts: {
                summaries: deepClone(summaries),
                thinListWidgets: deepClone(thinListWidgets),
                largeListWidgets: deepClone(largeListWidgets)
            },
            closedPanels: []
        })
    }

    gridEnabled() {
        return (this.props.currentScreenSize !== SCREEN_SIZE_XS &&
        this.props.currentScreenSize !== SCREEN_SIZE_SM);
    }

    render() {
        const { ResponsiveGridLayout } = this;

        return (
            <div style={ { paddingTop: !this.props.headerEnabled ? '19px' : '0' } }>
                <Header
                    style={ this.props.headerStyle }
                    fluid={ this.props.contentView !== CONTENT_VIEW_STATIC }
                    currentUrl={ this.props.location.pathname }
                >
                    <div className={ classes.headerContent }>
                        <Button
                            bsStyle='primary'
                            bsSize='sm'
                            outline
                            onClick={ () => this.resetLayout() }
                        >
                            Reset Layout
                        </Button>
                    </div>
                </Header>

                <Grid fluid={ this.props.contentView !== CONTENT_VIEW_STATIC }>
                    {
                        !this.props.headerEnabled && (
                            <div className='text-right'>
                                <Button
                                    bsStyle='primary'
                                    onClick={ () => this.resetLayout() }
                                >
                                    Reset Layout
                                </Button>
                            </div>
                        )
                    }
                    <div  style={ { margin: '0 -15px' } }>
                        <FloatGrid active={ this.gridEnabled() }>
                            <FloatGrid.Row rowHeight={ 150 }>
                                <FloatGrid.Col lg={ 3 } md={ 6 }>
                                    <SummaryBox
                                        title='Capacity'
                                        value='1,288'
                                        unit='$'
                                        color='primary'
                                        icon={ <i className='fa fa-database'></i> }
                                        footer={
                                            <div>
                                                <i className='fa fa-history m-r-1'></i>
                                                <span>Updated Now</span>
                                            </div>
                                        }
                                    />
                                </FloatGrid.Col>
                                <FloatGrid.Col lg={ 3 } md={ 6 }>
                                    <SummaryBox
                                        title='Revenue'
                                        value='1,234'
                                        unit='$'
                                        color='success'
                                        icon={ <i className='fa fa-dollar'></i> }
                                        footer={
                                            <div>
                                                <i className='fa fa-calendar-o m-r-1'></i>
                                                <span>Last Day</span>
                                            </div>
                                        }
                                    />
                                </FloatGrid.Col>
                                <FloatGrid.Col lg={ 3 } md={ 6 }>
                                    <SummaryBox
                                        title='Errors'
                                        value='34'
                                        color='warning'
                                        icon={ <i className='fa fa-exclamation'></i> }
                                        footer={
                                            <div>
                                                <i className='fa fa-clock-o m-r-1'></i>
                                                <span>In the last Hour</span>
                                            </div>
                                        }
                                    />
                                </FloatGrid.Col>
                                <FloatGrid.Col lg={ 3 } md={ 6 }>
                                    <SummaryBox
                                        title='Alerts'
                                        value='98'
                                        color='danger'
                                        icon={ <i className='fa fa-flash'></i> }
                                        footer={
                                            <div>
                                                <i className='fa fa-desktop m-r-1'></i>
                                                <span>From Beginning</span>
                                            </div>
                                        }
                                    />
                                </FloatGrid.Col>
                            </FloatGrid.Row>

                            <FloatGrid.Row rowHeight={ 400 }>
                                {
                                    this.isPanelOpen('notifications') && (
                                        <FloatGrid.Col lg={ 4 }>
                                            <Notifications onClose={ () => this.closePanel('notifications') }/>
                                        </FloatGrid.Col>
                                    )
                                }
                                {
                                    this.isPanelOpen('emails') && (
                                        <FloatGrid.Col lg={ 4 }>
                                            <Emails onClose={ () => this.closePanel('emails') } />
                                        </FloatGrid.Col>
                                    )
                                }
                                {
                                    this.isPanelOpen('timeline_1') && (
                                        <FloatGrid.Col lg={ 4 }>
                                            <Timeline
                                                title='Timeline #1'
                                                onClose={ () => this.closePanel('timeline_1') }
                                            >
                                                <TimelineExample1 />
                                            </Timeline>
                                        </FloatGrid.Col>
                                    )
                                }
                                {
                                    this.isPanelOpen('tasks') && (
                                        <FloatGrid.Col lg={ 4 }>
                                            <Tasks onClose={ () => this.closePanel('tasks') } />
                                        </FloatGrid.Col>
                                    )
                                }
                                {
                                    this.isPanelOpen('coments') && (
                                        <FloatGrid.Col lg={ 4 }>
                                            <Comments onClose={ () => this.closePanel('coments') } />
                                        </FloatGrid.Col>
                                    )
                                }
                                {
                                    this.isPanelOpen('reminders') && (
                                        <FloatGrid.Col lg={ 4 }>
                                            <Reminders onClose={ () => this.closePanel('reminders') } />
                                        </FloatGrid.Col>
                                    )
                                }
                                {
                                    this.isPanelOpen('projects') && (
                                        <FloatGrid.Col lg={ 4 }>
                                            <Projects onClose={ () => this.closePanel('projects') } />
                                        </FloatGrid.Col>
                                    )
                                }
                                {
                                    this.isPanelOpen('users') && (
                                        <FloatGrid.Col lg={ 4 }>
                                            <Users onClose={ () => this.closePanel('users') } />
                                        </FloatGrid.Col>
                                    )
                                }
                                {
                                    this.isPanelOpen('chat') && (
                                        <FloatGrid.Col lg={ 4 }>
                                            <Chat onClose={ () => this.closePanel('chat') } />
                                        </FloatGrid.Col>

                                    )
                                }
                            </FloatGrid.Row>

                            <FloatGrid.Row rowHeight={ 400 }>
                                {
                                    this.isPanelOpen('comments2') && (
                                        <FloatGrid.Col lg={ 6 }>
                                            <Comments2 onClose={ () => this.closePanel('comments2') } />
                                        </FloatGrid.Col>
                                    )
                                }
                                {
                                    this.isPanelOpen('attachments') && (
                                        <FloatGrid.Col lg={ 6 }>
                                            <Attachments onClose={ () => this.closePanel('attachments') } />
                                        </FloatGrid.Col>
                                    )
                                }
                                {
                                    this.isPanelOpen('timeline_2') && (
                                        <FloatGrid.Col lg={ 6 }>
                                            <Timeline
                                                title='Timeline #2'
                                                onClose={ () => this.closePanel('timeline_2') }
                                            >
                                                <TimelineExample2 />
                                            </Timeline>
                                        </FloatGrid.Col>
                                    )
                                }
                                {
                                    this.isPanelOpen('timeline_3') && (
                                        <FloatGrid.Col lg={ 6 }>
                                            <Timeline
                                                title='Timeline #3'
                                                onClose={ () => this.closePanel('timeline_3') }
                                            >
                                                <TimelineExample3 />
                                            </Timeline>
                                        </FloatGrid.Col>
                                    )
                                }
                            </FloatGrid.Row>
                        </FloatGrid>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default connect(state => ({
    contentView: state.layout.contentView,
    headerEnabled: state.layout.headerEnabled,
    headerStyle: state.layout.headerStyle,
    currentScreenSize: state.layout.currentScreenSize
}))(DataWidgetsContainer);
