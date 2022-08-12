import React from 'react';
import MyPostsContainer from './MyPosts/MyPosts-Container';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo
        profile={props.profile}
        dataAvailability={props.dataAvailability}
        userStatus={props.userStatus}
        updateUserStatus={props.updateUserStatus}
        authorizedId={props.authorizedId}
        params={props.params}
        addPhoto={props.addPhoto}
      />
      <MyPostsContainer params={props.params} />
    </div>
  );
};
export default Profile;
