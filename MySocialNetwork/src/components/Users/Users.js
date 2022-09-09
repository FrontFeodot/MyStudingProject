import { Button } from 'primereact/button';
import React from 'react';
import UsersPaginator from '../common/Paginators/UsersPaginator';
import style from './users.module.css';

import User from './User';
import UserSearcher from './UserSearcher';

const Users = ({
  currentPage,
  totalUsersCount,
  pageSize,
  onPageChanged,

  ...props
}) => {
  return (
    <div>
      <UserSearcher
        searchUsers={props.searchUsers}
        pageSize={pageSize}
        currentPage={currentPage}
      />
      {props.users.map((u) => {
        return (
          <User
            key={u.id}
            user={u}
            follow={props.follow}
            unfollow={props.unfollow}
            followingInProgress={props.followingInProgress}
            isAuth={props.isAuth}
          />
        );
      })}
      <UsersPaginator
        currentPage={currentPage}
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
      />
      <Button
        className={style.upButton}
        label='Page up'
        onClick={(e) => {
          window.scrollTo(0, 0);
        }}
      />
    </div>
  );
};

export default Users;
