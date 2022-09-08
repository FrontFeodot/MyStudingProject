import React from 'react';
import { NavLink } from 'react-router-dom';
import userPhoto from '../../assets/image.png';
import style from './users.module.css';
import { Button } from 'primereact/button';

const User = ({ user, followingInProgress, follow, unfollow, isAuth }) => {
  return (
    <div>
      <span>
        <div className={style.userBlock}>
          <NavLink
            style={{ textDecoration: 'none', color: 'black' }}
            to={'/profile/' + user.id}
          >
            <img
              src={user.photos.small != null ? user.photos.small : userPhoto}
              alt='avatar'
              className={style.usersAva}
            />
            <span>
              <div>
                <b>Username:</b> {user.name}
              </div>
            </span>
          </NavLink>
          <div>
            <b>User status:</b>
            {user.status ? user.status : ' No status'}
          </div>
        </div>
        {isAuth ? (
          <div className={style.userBlock}>
            {user.followed ? (
              <Button
                label='UNFOLLOW'
                className='p-button-danger'
                disabled={followingInProgress.some((id) => id === user.id)}
                onClick={() => {
                  unfollow(user.id);
                }}
              />
            ) : (
              <Button
                label='FOLLOW'
                className='p-button-success'
                disabled={followingInProgress.some((id) => id === user.id)}
                onClick={() => {
                  follow(user.id);
                }}
              />
            )}
          </div>
        ) : null}
      </span>
    </div>
  );
};
export default User;
