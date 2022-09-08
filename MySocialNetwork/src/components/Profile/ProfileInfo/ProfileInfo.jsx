import React from 'react';
import userPhoto from '../../../assets/image.png';
import Preloader from '../../common/Preloader/Preloader';
import Contact from './Contact';
import style from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = ({ profile, ...props }) => {
  return (
    <div>
      <div className={style.descriptionBlock}>
        <img
          className={style.ava__img}
          src={profile.photos.large || userPhoto}
          alt='profilePhoto'
        />
        <ProfileData profile={profile} {...props} />
      </div>
    </div>
  );
};

const ProfileData = ({ profile, ...props }) => {
  return (
    <div>
      <div>
        <div>
          <b>FullName: </b> {profile.fullName}
        </div>
        <div>
          <b></b>
        </div>
        <div>
          <b>Status: </b>
          <ProfileStatus
            userStatus={props.userStatus}
            updateUserStatus={props.updateUserStatus}
            authorizedId={props.authorizedId}
            params={props.params}
          />
        </div>
        <div>
          <b>LookingForAJob: </b> {profile.lookingForAJob ? 'Yes' : 'No'}
        </div>
        <div>
          <b>Skills: </b>
          {profile.lookingForAJobDescription || 'empty'}
        </div>
        <div>
          <b>About Me: </b> {profile.aboutMe}
        </div>
      </div>
      <div className={style.contacts}>
        <b className={style.contacts}>Contacts: </b>
        {Object.keys(profile.contacts)
          .filter((key) => key !== 'vk')
          .map((key, index) => {
            return (
              <div className={style.contact}>
                <Contact
                  key={index}
                  contactTitle={key}
                  contactValue={profile.contacts[key]}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default React.memo(ProfileInfo);
