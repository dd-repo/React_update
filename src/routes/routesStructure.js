import React from 'react';
import {
    Label,
    Badge
} from 'components';

import uuid from 'node-uuid';
import _ from 'underscore';

import { getMenuEntries as getSkinMenuEntries } from './Skins';
import { getMenuEntries as getSidebarsMenuEntries } from './Sidebars';

const CONFIG = [
    {
        slug: 'Google Results',
        title: 'Google Results',
        url: '/dashboard',
        icon: 'fa fa-google fa-lg',
    },
    {
        slug: 'Privacy Guard',
        title: 'Privacy Guard',
        icon: 'fa fa-shield fa-lg',
        url: '/dashboard/privacy-guard'
    },
    {
        slug: 'Alerts',
        title: 'Alerts',
        icon: 'fa fa-fw fa-lg fa-bell',
        url: 'dashboard/alerts',
        sidebarElement: (<Badge bsStyle='info' outline className='pull-right'>2</Badge>)
        //children: getSidebarsMenuEntries()
    },
    {
        slug: 'Profile',
        title: 'Profile',
        icon: 'fa fa-lock fa-lg',
        url: 'dashboard/profile',
    },
    {
        slug: 'Preferences',
        title: 'Preferences',
        icon: 'fa fa-cog fa-lg',
        url: 'dashboard/preferences'
    },
    //{
        //slug: 'graphs',
        //title: 'Graphs',
        //icon: 'fa fa-pie-chart fa-lg',
        //children: [
            //{
                //title: 'Highcharts',
                //url: '/graphs/highcharts'
            //},
            //{
                //title: 'Highstock',
                //url: '/graphs/highstock/general',
                //matcher: /\/graphs\/highstock(\/.*)?/
            //},
            //{
                //title: 'Sparklines',
                //url: '/graphs/sparklines'
            //},
            //{
                //title: 'Chartist',
                //url: '/graphs/chartist'
            //}
        //]
    //},
    //{
        //slug: 'tables',
        //title: 'Tables',
        //icon: 'fa fa-trello fa-lg',
        //children: [
            //{
                //title: 'Pricing Tables',
                //url: '/tables/pricing-tables'
            //},
            //{
                //title: 'Tables',
                //url: '/tables/tables'
            //}
        //]
    //},
    //{
        //slug: 'forms',
        //title: 'Forms',
        //icon: 'fa fa-check-square-o fa-lg',
        //children: [
            //{
                //title: 'Forms',
                //url: '/forms/forms'
            //},
            //{
                //title: 'Forms Layouts',
                //url: '/forms/forms-layouts'
            //}
        //]
    //},
    //{
        //slug: 'grids',
        //title: 'Grids',
        //icon: 'fa fa-lg fa-th-list fa-fw',
        //url: '/grids'
    //},
    //{
        //slug: 'pages',
        //title: 'Pages',
        //icon: 'fa fa-clone fa-lg fa-fw',
        //children: [
            //{
                //title: 'Register',
                //url: '/pages/register'
            //},
            //{
                //title: 'Login',
                //url: '/pages/login'
            //},
            //{
                //title: 'Forgot Password',
                //url: '/pages/forgot-password'
            //},
            //{
                //title: 'Lock Screen',
                //url: '/pages/lock-screen'
            //},
            //{
                //title: 'Error 404',
                //url: '/pages/not-found'
            //},
            //{
                //title: 'Invoice',
                //url: '/pages/invoice'
            //},
            //{
                //title: 'Timeline',
                //url: '/pages/timeline'
            //},
        //]
    //},
    //{
        //slug: 'apps',
        //title: 'Apps',
        //icon: 'fa fa-suitcase fa-lg fa-fw',
        //children: [
            //{
                //slug: 'projects',
                //title: 'Projects',
                //children: [
                    //{
                        //title: 'Projects List',
                        //url: '/apps/projects/list'
                    //},
                    //{
                        //title: 'Projects Grid',
                        //url: '/apps/projects/grid'
                    //}
                //]
            //},
            //{
                //slug: 'tasks',
                //title: 'Tasks',
                //children: [
                    //{
                        //title: 'Tasks List',
                        //url: '/apps/tasks/list'
                    //},
                    //{
                        //title: 'Tasks Grid',
                        //url: '/apps/tasks/grid'
                    //},
                    //{
                        //title: 'Task Details',
                        //url: '/apps/task-details'
                    //}
                //]
            //},
            //{
                //slug: 'files-manager',
                //title: 'Files Manager',
                //children: [
                    //{
                        //title: 'Files List',
                        //url: '/apps/files-manager/files-list'
                    //},
                    //{
                        //title: 'Files Grid',
                        //url: '/apps/files-manager/files-grid'
                    //}
                //]
            //},
            //{
                //slug: 'search',
                //title: 'Search',
                //children: [
                    //{
                        //title: 'Search Results',
                        //url: '/apps/search/search-results'
                    //},
                    //{
                        //title: 'Image Results',
                        //url: '/apps/search/image-results'
                    //},
                    //{
                        //title: 'Video Results',
                        //url: '/apps/search/video-results'
                    //},
                    //{
                        //title: 'User Results',
                        //url: '/apps/search/user-results'
                    //}
                //]
            //},
            //{
                //slug: 'faq',
                //title: 'FAQ',
                //url: '/apps/faq'
            //},
            //{
                //slug: 'users',
                //title: 'Users',
                //children: [
                    //{
                        //title: 'Users List',
                        //url: '/apps/users/list'
                    //},
                    //{
                        //title: 'Users Grid',
                        //url: '/apps/users/grid'
                    //}
                //]
            //},
            //{
                //slug: 'chat',
                //title: 'Chat',
                //url: '/apps/chat'
            //},
            //{
                //slug: 'mailbox',
                //title: 'Mailbox',
                //children: [
                    //{
                        //title: 'Inbox',
                        //url: '/apps/inbox'
                    //},
                    //{
                        //title: 'Email Details',
                        //url: '/apps/email-details'
                    //},
                    //{
                        //title: 'New Email',
                        //url: '/apps/new-email'
                    //}
                //]
            //},
            //{
                //title: 'Clients',
                //url: '/apps/clients'
            //},
            //{
                //slug: 'user-profile',
                //title: 'User Profile',
                //children: [
                    //{
                        //title: 'Profile Details',
                        //url: '/apps/profile-details'
                    //},
                    //{
                        //title: 'Profile Edit',
                        //url: '/apps/user-profile/edit/profile'
                    //},
                    //{
                        //title: 'Account Edit',
                        //url: '/apps/user-profile/edit/account'
                    //},
                    //{
                        //title: 'Billing Edit',
                        //url: '/apps/user-profile/edit/billing'
                    //},
                    //{
                        //title: 'Settings Edit',
                        //url: '/apps/user-profile/edit/settings'
                    //},
                    //{
                        //title: 'Sessions Edit',
                        //url: '/apps/user-profile/edit/sessions'
                    //}
                //]
            //}
        //]
    //},
    //{
        //slug: 'icons',
        //title: 'Icons',
        //icon: 'fa fa-star fa-lg fa-fw',
        //children: [
            //{
                //title: 'Font Awesome',
                //url: '/icon-set/font-awesome'
            //},
            //{
                //title: 'GlyphIcons',
                //url: '/icon-set/glyphicons'
            //}
        //]
    //},
    //{
        //slug: 'panels',
        //title: 'Panels',
        //icon: 'fa fa-columns fa-lg',
        //url: '/panels',
        //sidebarElement: (<Badge bsStyle='custom' outline className='pull-right'>3</Badge>)
    //},
    //{
        //title: 'Docs',
        //external: true,
        //newTab: true,
        //icon: 'fa fa-file-o fa-lg',
        //url: '//spin.webkom.co/docs/docs-react.html'
    //},
    //{
        //title: 'Switch to jQuery',
        //external: true,
        //icon: 'fa fa-html5 fa-lg',
        //url: '//spin.webkom.co'
    //}
];

// Add keys to the sidebar definitions
const assignKeys = (input, level = 0) => _.map(input, (def) => {
    const newObj = { key: uuid.v4(), subMenuLevel: level };
    if(def.children) {
        newObj.children = assignKeys(def.children, level + 1);
    }
    return Object.assign({}, def, newObj);
});

export function urlMatcher(node, url) {
    if(node.matcher && !!url.match(node.matcher)) {
        return true;
    }

    return node.url === url;
}

export function findActiveNodes(nodes, url) {
    const activeNodes = [];

    const nodeIterator = (nodes) => {
        let found = false;

        nodes.forEach((node) => {
            if (node.children && nodeIterator(node.children)) {
                activeNodes.push(node);
                found = true;
            } else if (node.url && urlMatcher(node, url)) {
                activeNodes.push(node);
                found = true;
            }
        });

        return found;
    };

    nodeIterator(nodes);

    return activeNodes;
};

export function findSectionBySlug(nodes, slugName) {
    // Returns flatten sections
    const getSections = function*(nodesTree) {
        for(let node of nodesTree) {
            yield node;

            if(node.children) {
                for(let section of getSections(node.children)) {
                    yield section;
                }
            }
        }
    };

    const sections = Array.from(getSections(nodes));

    return _.findWhere(sections, { slug: slugName });
}

export default assignKeys(CONFIG);
