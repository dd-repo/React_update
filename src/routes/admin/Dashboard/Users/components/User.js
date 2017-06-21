import React, { PropTypes } from 'react';
import { Button, DropdownButton, MenuItem } from 'components'

import { formatDate } from 'utils/dateHelper';

const User = (props) => {
  const {
    id,
    first_name,
    last_name,
    email,
    group,
    role,
    accounts,
    created_at,
  } = props.user

  const _onSelect = (action) => {
    props.handleClick(action, id)
  }

  const fullName = `${first_name} ${last_name}`
  const renderButton = (
    <DropdownButton onSelect={_onSelect}
      title='Actions'
      bsStyle='danger'
      id='dropdown-basic-4'
      bsSize='lg'
      className='m-b-1'
    >
      <MenuItem eventKey="become">Become</MenuItem>
      {/*
          <MenuItem eventKey="edit">Edit</MenuItem>
          */}
    </DropdownButton>
  )

  return (
    <tr className='bg-gray-darker' key={id}>
      <td>
          { id }
      </td>
      <td>
        <a href='javascript:void(0)' onClick={() => {_onSelect('user')}}>
        { fullName }
        </a>
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
        { renderButton }
      </td>
    </tr>
  )
}

User.propTypes = {
  User: PropTypes.object
}

export default User;
