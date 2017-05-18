import React, { PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';

import { Colors } from './../../consts';

import Avatar from './Avatar';
import defaultAvatar from 'static/avatars/defaultAvatar.png';

import classes from './Avatar.scss';


class AvatarImage extends React.Component {
    static defaultProps = {
        src: defaultAvatar,
    };

    static propTypes = {
        src: PropTypes.string,
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            imageLoaded: false,
            imageLoadFailed: false
        }
    }

    render() {
        const otherProps = _.omit(this.props, [
            'src',
        ]);


        const avatarPath = this.props.src ? this.props.src : defaultAvatar

        return (
            <Avatar { ...otherProps }>
              <img
                src={ avatarPath }
                className={ classes.avatarContent }
              />
            </Avatar>
        );
    }
}

export default AvatarImage;
