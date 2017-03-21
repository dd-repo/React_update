import React from 'react';
import {
    Media
} from 'react-bootstrap';
import faker from 'faker';
import { Link } from 'react-router';

import {
    AvatarImage,
    Charts,
    Sidebar
} from 'components';

import { Colors } from 'consts';



const AvatarAndStats = ({ currentUser, colorSidebar, avatar }) => {
  const { first_name, last_name } = currentUser
  const userName = `${first_name} ${last_name}`
  return (
    <Sidebar.AddOn>
        {/*     Default Sidebar     */}
        <Sidebar.AddOnContent supportedStyle='default'>
            <Media>
                <Media.Left align='middle'>
                    <i className="fa fa-fw fa-power-off"></i>
                </Media.Left>
                <Media.Body className='text-center'>
                    <Link to='/apps/profile-details'>
                        <AvatarImage
                            src={ avatar }
                            showStatus
                            size='large'
                            statusPlacement='bottom'
                            statusColor={ Colors.brandSuccess }
                            statusBorderColor={ colorSidebar ? '#fff' : Colors.grayDarker }
                        />
                    </Link>
                    <div className='m-t-2'>
                        <Media.Heading
                            componentClass='h5'
                            className='m-y-0'
                        >
                        {userName}
                        </Media.Heading>
                        <small></small>
                    </div>
                </Media.Body>
                <Media.Right align='middle'>
                    <Link to='/apps/user-profile/edit/profile'>
                        <i className="fa fa-fw fa-gear text-gray-lighter"></i>
                    </Link>
                </Media.Right>
            </Media>
            <div className='text-center m-t-2'>
                <div className='m-y-2'>
                </div>
            </div>
        </Sidebar.AddOnContent>
        {/*     Slim Sidebar     */}
        <Sidebar.AddOnContent supportedStyle='big-icons'>
            <Link to='/dashboard/profile-details'>
                <AvatarImage
                    src={ avatar }
                    showStatus
                    statusPlacement='bottom'
                    statusColor={ Colors.brandSuccess }
                    statusBorderColor={ colorSidebar ? '#fff' : Colors.grayDarker }
                    className='m-b-1'
                />
            </Link>
            <p className='text-white m-y-0'>
                { userName }
            </p>
        </Sidebar.AddOnContent>
        {/*     BigIcons Sidebar     */}
        <Sidebar.AddOnContent supportedStyle='slim'>
            <Link to='/dashboard/profile-details'>
                <AvatarImage
                    src={ avatar }
                    showStatus
                    statusPlacement='bottom'
                    statusColor={ Colors.brandSuccess }
                    statusBorderColor={ colorSidebar ? '#fff' : Colors.grayDarker }
                    size='small'
                />
            </Link>
        </Sidebar.AddOnContent>
    </Sidebar.AddOn>
)
}

AvatarAndStats.propTypes = {
  colorSidebar: React.PropTypes.bool,
  currentUser: React.PropTypes.object.isRequired
};

export default AvatarAndStats;
