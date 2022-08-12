import React from 'react';
import { NavLink } from 'react-router-dom';
import userPhoto from '../../assets/image.png';
import style from './users.module.css';

const User = ({ user, followingInProgress, follow, unfollow }) => {
  return (
    <div>
      <span>
        <div>
          <NavLink to={'/profile/' + user.id}>
            <img
              src={user.photos.small != null ? user.photos.small : userPhoto}
              alt='avatar'
              className={style.usersAva}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                unfollow(user.id);
              }}
            >
              UNFOLLOW
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                follow(user.id);
              }}
            >
              FOLLOW
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>{/* user.location.country */}</div>
          <div>{/* user.location.city */}</div>
        </span>
      </span>
    </div>
  );
};
export default User;
