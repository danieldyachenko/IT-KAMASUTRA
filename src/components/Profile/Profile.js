import React from 'react';
import s from './Profile.module.css'
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo.jsx';

const Profile = (props) => {
  return (
    <div className = {s.Profile}>
      <ProfileInfo profile={props.profile} />
      <MyPostsContainer />
    </div>
  );
}

export default Profile;


