import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import { ProfileStatus } from './ProfileStatus/ProfileStatus';
import {ProfileStatusWithHooks} from "./ProfileStatus/ProfileStatusWithHooks";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <>
            <img src={props.profile.photos.large} />
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
        </>
    )
}

export default ProfileInfo