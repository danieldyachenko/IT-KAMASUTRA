import React from 'react';
import {createField, Input, Textarea} from "../../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";

const ProfileDataForm = ({handleSubmit, profile}) =>
    <form onSubmit={handleSubmit}>
        <button>save</button>
        <div>
            <b>Full name</b>: {createField('Full name', 'fullName', Input, [])}
        </div>
        <div>
            <b>Looking for a job</b>:
            {createField('', 'lookingForAJob', Input, [], {type: 'checkbox'})}
        </div>
        <div>
            <b>My professionals skills</b>:
            {createField('My professionals skills', 'lookingForAJobDescription', Textarea, [])}
        </div>
        <div>
            <b>About me</b>: {profile.aboutMe}
            {createField('About me', 'aboutMe', Textarea, [])}
        </div>
        {/* <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>*/}
    </form>;

export const ProfileDataReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm);