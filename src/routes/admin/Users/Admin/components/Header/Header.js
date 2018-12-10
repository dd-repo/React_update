import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import capitalize from 'utils/capitalize';
import classes from '../admin.scss';

const Header = ({ fullName }) => (
  <div className={ `${classes.taskHeader} flex-space-between` }>
    <h2 className='m-y-0 f-w-300'>
      <Link to='/admin/dashboard/users/admin'>
        Admin
      </Link>
      <span className='text-muted m-x-1'>/</span>
      <span>
        {capitalize(fullName)}
      </span>
    </h2>
  </div>
)
Header.defaultProps = {
  fullName: ''
}
Header.propTypes = {
  fullName: PropTypes.string
}

export default Header;
