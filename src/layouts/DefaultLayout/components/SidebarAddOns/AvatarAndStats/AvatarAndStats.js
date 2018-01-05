import React from 'react';
import {
    Media
} from 'react-bootstrap';
// import faker from 'faker';
import { Link } from 'react-router';

import {
    AvatarImage,
    Charts,
    Sidebar
} from 'components';

import { Colors } from 'consts';



const AvatarAndStats = ({ fullName, colorSidebar, avatar }) => {
  return (
    <Sidebar.AddOn>
        {/*     Default Sidebar     */}
        <Sidebar.AddOnContent supportedStyle='default'>
            <Media>
                <Media.Body className='text-center'>
                  <Link to='/dashboard/account'>
                        <AvatarImage
                            src={ avatar }
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
                        {fullName}
                        </Media.Heading>
                        <small></small>
                    </div>
                </Media.Body>
            </Media>
            <div className='text-center m-t-2'>
                <div className='m-y-2'>
                </div>
            </div>
        </Sidebar.AddOnContent>
        {/*     Slim Sidebar     */}
        <Sidebar.AddOnContent supportedStyle='big-icons'>
            <Link to='/dashboard/user-profile'>
                <AvatarImage
                    src={ avatar }
                    statusPlacement='bottom'
                    statusColor={ Colors.brandSuccess }
                    statusBorderColor={ colorSidebar ? '#fff' : Colors.grayDarker }
                    className='m-b-1'
                />
            </Link>
            <p className='text-white m-y-0'>
                { fullName }
            </p>
        </Sidebar.AddOnContent>
        {/*     BigIcons Sidebar     */}
        <Sidebar.AddOnContent supportedStyle='slim'>
            <Link to='/dashboard/user-profile'>
                <AvatarImage
                    src={ avatar }
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
  fullName: React.PropTypes.string.isRequired,
  avatar: React.PropTypes.string
};

export default AvatarAndStats;
