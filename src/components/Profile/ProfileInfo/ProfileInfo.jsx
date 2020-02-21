import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import { ProfileStatus } from './ProfileStatus/ProfileStatus';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <>
            <img src={props.profile.photos.large} />
            <ProfileStatus status='Мертв' />
        </>
    )
}

export default ProfileInfo