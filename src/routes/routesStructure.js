import {
    Label,
    Badge
} from 'components'

import uuid from 'node-uuid'
import _ from 'underscore'

// import { getMenuEntries as getSkinMenuEntries } from './Skins';
// import { getMenuEntries as getSidebarsMenuEntries } from './Sidebars';

export const CONFIGS = {
  'client': [
    {
      slug: 'Dashboard',
      title: 'Dashboard',
      icon: 'fa fa-tachometer fa-lg',
      url: '/dashboard'
    },
    {
      slug: 'Google Results',
      title: 'Google Results',
      icon: 'fa fa-google fa-lg',
      url: '/dashboard/google-results'
    },
    {
      slug: 'Privacy',
      title: 'Privacy',
      icon: 'fa fa-shield fa-lg',
      url: '/dashboard/privacy'
    },
    // {
      // slug: 'Alerts',
      // title: 'Alerts',
      // icon: 'fa fa-fw fa-lg fa-bell',
      // url: '/dashboard/alerts',
      // sidebarElement: (<Badge bsStyle='info' outline className='pull-right'>2</Badge>)
      // children: getSidebarsMenuEntries()
    // },
    {
      slug: 'profile',
      title: 'Profile',
      icon: 'fa fa-lock fa-lg',
      url: '/dashboard/user-profile'
    },
    {
      slug: 'Account',
      title: 'Account',
      icon: 'fa fa-cog fa-lg',
      url: '/dashboard/account-settings'
    },
    {
      slug: 'Feedback',
      title: 'Feedback',
      icon: 'fa fa-comment',
      url: '/dashboard/feedback'
    }
  ],
  'admin': [
    {
      slug: 'Users',
      title: 'Users',
      icon: 'fa fa-user fa-lg',
      children: [
        {
          title: 'Clients',
          url: '/admin/dashboard/users/clients'
        },
        {
          title: 'Admin',
          url: '/admin/dashboard/users/admin'
        }
      ]
    },
    {
      slug: 'Removals',
      title: 'Removals',
      icon: 'fa fa-times fa-lg',
      children: [
        {
          title: 'Requested',
          url: '/admin/dashboard/removals/requested'
        },
        {
          title: 'In Progress',
          url: '/admin/dashboard/removals/in-progress'
        },
        {
          title: 'Completed',
          url: '/admin/dashboard/removals/completed'
        }
      ]
    },
    {
      slug: 'transactions',
      title: 'Transactions',
      icon: 'fa fa-credit-card fa-lg',
      url: '/admin/dashboard/transactions'
    },
    {
      slug: 'subscriptions',
      title: 'Subscriptions',
      icon: 'fa fa-newspaper-o fa-lg',
      url: '/admin/dashboard/subscriptions'
    },
    {
      slug: 'Client Signup Form',
      title: 'Client Registration',
      icon: 'fa fa-user-plus fa-lg',
      url: '/admin/dashboard/client-registration'
    },
    {
      slug: 'Create User Form',
      title: 'Create User',
      icon: 'fa fa-user-secret fa-lg',
      url: '/admin/dashboard/create-user'
    }
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
