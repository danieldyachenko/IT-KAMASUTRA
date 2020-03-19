import React, {useState} from 'react';
import Preloader from '../../common/Preloader/Preloader';
import {ProfileStatusWithHooks} from "./ProfileStatus/ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/user.png';
import s from './ProfileInfo.module.css'
import {ProfileDataReduxForm} from "./ProfileStatus/ProfileDataForm";

const ProfileInfo = (props) => {
    const [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = e => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    };

    const onSubmit = formData => {
        props.saveProfile(formData).then(() => {
            setEditMode(false);
        });
    };

    return (
        <>
            <img src={props.profile.photos.large || userPhoto} className={s.mainPhoto}/>
            {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
            {editMode
                ? <ProfileDataReduxForm profile={props.profile} onSubmit={onSubmit} initialValues={props.profile} />
                : <ProfileData
                    profile={props.profile}
                    isOwner={props.isOwner}
                    goToEditMode={() => {setEditMode(true)}}
                />
            }
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
        </>
    )
};

const ProfileData = ({profile, isOwner, goToEditMode}) =>
    <div>
        { isOwner && <button onClick={goToEditMode}>edit</button> }
        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {
            profile.lookingForAJob &&
            <div>
                <b>My professionals skills</b>: {profile.lookingForAJobDescription}
            </div>
        }
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
    </div>;

const Contacts = ({contactTitle, contactValue}) =>
    <div className={s.contacts}><b>{contactTitle}</b>: {contactValue}</div>;

export default ProfileInfo