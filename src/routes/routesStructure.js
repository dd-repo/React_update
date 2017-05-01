import React from 'react';
import {
    Label,
    Badge
} from 'components';

import uuid from 'node-uuid';
import _ from 'underscore';

//import { getMenuEntries as getSkinMenuEntries } from './Skins';
//import { getMenuEntries as getSidebarsMenuEntries } from './Sidebars';

export const CONFIGS = {
  'client': [
    {
      slug: 'Google Results',
      title: 'Google Results',
      url: '/dashboard',
      icon: 'fa fa-google fa-lg',
    },
    {
      slug: 'Privacy',
      title: 'Privacy',
      icon: 'fa fa-shield fa-lg',
      url: '/dashboard/privacy'
    },
    {
      slug: 'Alerts',
      title: 'Alerts',
      icon: 'fa fa-fw fa-lg fa-bell',
      url: '/dashboard/alerts',
      //sidebarElement: (<Badge bsStyle='info' outline className='pull-right'>2</Badge>)
      //children: getSidebarsMenuEntries()
    },
    {
      slug: 'profile',
      title: 'Profile',
      icon: 'fa fa-lock fa-lg',
      children: [
        {
          title: 'Profile Details',
          url: '/dashboard/user-profile',
        },
        {
          title: 'Profile Edit',
          url: '/dashboard/user-profile/edit',
        }
      ]
    },
    {
      slug: 'Account',
      title: 'Account',
      icon: 'fa fa-cog fa-lg',
      url: '/dashboard/account-settings'
    }
  ],
  'admin': [
    {
      slug: 'Removals',
      title: 'Removals',
      url: '/admin/dashboard',
      children: [
        {
          title: 'In Progress',
          url: '/admin/dashboard/removals/in-progress'
        }
      ]
    },
    {
      slug: 'Client Signup Form',
      title: 'Client Signup',
      url: '/admin/dashboard/client-signup'
    },
    {
      slug: 'transactions',
      title: 'Transactions',
      url: '/admin/dashboard/transactions'
    },
  ]
}

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

export default assignKeys;
