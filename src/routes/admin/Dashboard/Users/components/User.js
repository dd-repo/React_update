import React, { PropTypes } from 'react';

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
    created_at
  } = props.user

  return (
    <tr className='bg-gray-darker' key={id}>
      <td>
        { id }
      </td>
      <td>
        { first_name }
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
    </tr>
  )
}

User.propTypes = {
  User: PropTypes.object
}

export default User;

