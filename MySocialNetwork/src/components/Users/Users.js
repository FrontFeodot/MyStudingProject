import React from 'react';
import UsersPaginator from '../common/Paginators/UsersPaginator';

import User from './User';

const Users = ({
  currentPage,
  totalUsersCount,
  pageSize,
  onPageChanged,

  ...props
}) => {
  return (
    <div>
      <UsersPaginator
        currentPage={currentPage}
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
      />
      {props.users.map((u) => {
        return (
          <User
            key={u.id}
            user={u}
            follow={props.follow}
            unfollow={props.unfollow}
            followingInProgress={props.followingInProgress}
          />
        );
      })}
    </div>
  );
};

export default Users;
