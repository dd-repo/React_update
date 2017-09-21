import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import {
  Button,
  DropdownButton,
  MenuItem,
  Label
} from 'components'

import getFullName from 'utils/fullName';

import { formatDate } from 'utils';

const User = (props) => {
  const {
    id,
    first_name,
    last_name,
    email,
    group,
    role,
    accounts,
    is_active,
    active_until,
    created_at,
  } = props.user

  const _onSelect = action => {
    props.handleDropdownSelect(id, action)
  }

  const fullName = getFullName(props.user)

  const renderButton = (
    <DropdownButton
      onSelect={_onSelect}
      title='Actions'
      bsStyle='danger'
      id='dropdown-basic-4'
      bsSize='lg'
      className='m-b-1'
      disabled={group === 'backend'}
    >
      <MenuItem eventKey="become">Become</MenuItem>
      <MenuItem eventKey="delete">Delete</MenuItem>
    </DropdownButton>
  )

  const renderClientLink = (
    group === 'frontend' ?
        <Link to={`/admin/dashboard/users/client/${id}`}>
          { fullName }
        </Link>
        :
        <Link to={`/admin/dashboard/users/admin/${id}`}>
          { fullName }
        </Link>

  )

  return (
    <tr className='bg-gray-darker' key={id}>
      <td>
          { id }
      </td>
      <td>
        { renderClientLink }
      </td>
      <td>
        { email }
      </td>
      <td>
        { group }
      </td>
      <td>
        { role }
      </td>
      <td>
        { formatDate(created_at) }
      </td>
      <td>
        { formatDate(active_until) }
      </td>
      <td>
        <Label
          outline
          className='text-uppercase'
          bsStyle={is_active ? 'success' : 'danger'}>
          {is_active ? 'Active' : 'Inactive'}
        </Label>
      </td>
      <td>
        { renderButton }
      </td>
    </tr>
  )
}

User.propTypes = {
  User: PropTypes.object
}

export default User;
