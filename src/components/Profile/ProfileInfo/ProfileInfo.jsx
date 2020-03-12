import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import {ProfileStatusWithHooks} from "./ProfileStatus/ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/user.png';
import s from './ProfileInfo.module.css'

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = e => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    };

    return (
        <>
            <img src={props.profile.photos.large || userPhoto} className={s.mainPhoto}/>
            {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
            {/*{isOwner && <input type={{file}} onChange={onMainPhotoSelected} />}
            <div>
                <b>Full name</b>: {profile.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {
                profile.lookingForAJob &&
                <div>
                    <b>My professionals skills</b>: {profile.lookingForAJobDecription}
                </div>
            }
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {profile.aboutMe}
            </div>*/}
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
        </>
    )
}

export default ProfileInfo