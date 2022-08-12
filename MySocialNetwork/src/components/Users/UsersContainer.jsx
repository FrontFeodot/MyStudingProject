import React from 'react';
import { connect } from 'react-redux';
import {
  setUsers,
  follow,
  setCurrentPage,
  unfollow,
  setTotalUsersCount,
  toggleIsFetching,
  toggleFollowingProgress,
  requestUsers,
} from '../../redux/users-Reducer';
import Users from './Users';

import Preloader from '../common/Preloader/Preloader';
import { usersAPI } from '../../api/api';
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSizeSelector,
  getTotalUsersCount,
  getUsers,
} from '../../redux/users-selectors';
import { useEffect } from 'react';

const UsersContainer = ({ currentPage, pageSize, getUsers, ...props }) => {
  useEffect(() => {
    getUsers(currentPage, pageSize);
  }, [currentPage, pageSize, getUsers]);

  const onPageChanged = (pageNumber) => {
    props.setCurrentPage(pageNumber);
    props.toggleIsFetching(true);
    usersAPI.getUsers(pageNumber, props.pageSize).then((data) => {
      props.toggleIsFetching(false);
      props.setUsers(data.items);
    });
  };

  return (
    <>
      {props.isFetching ? <Preloader /> : null}
      <Users
        totalUsersCount={props.totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        users={props.users}
        follow={props.follow}
        unfollow={props.unfollow}
        followingInProgress={props.followingInProgress}
      />
    </>
  );
};

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSizeSelector(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
  toggleFollowingProgress,
  getUsers: requestUsers,
})(UsersContainer);

/* class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }
  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.toggleIsFetching(true);
    usersAPI.getUsers(pageNumber, this.props.pageSize).then((data) => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(data.items);
    });
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
} */
