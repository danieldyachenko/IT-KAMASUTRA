import React from 'react';
import Preloader from './../../common/Preloader/Preloader';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
      }
    return (
        <div>
            <div>
                <img src='' />
            </div>
            <div>
                <img src={props.profile.photos.large} />
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo