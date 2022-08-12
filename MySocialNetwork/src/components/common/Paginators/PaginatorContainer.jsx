/* import React from 'react';
import { connect } from 'react-redux';
import { usersAPI } from '../../../api/api';
import {
  setCurrentPage,
  setUsers,
  toggleIsFetching,
} from '../../../redux/users-Reducer';
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSizeSelector,
  getTotalUsersCount,
} from '../../../redux/users-selectors';
import UsersPaginator from './Paginator';

const PaginatorContainer = ({ currentPage, pageSize, getUsers, ...props }) => {
  const onPageChanged = (pageNumber) => {
    props.setCurrentPage(pageNumber);
    props.toggleIsFetching(true);
    usersAPI.getUsers(pageNumber, props.pageSize).then((data) => {
      props.toggleIsFetching(false);
      props.setUsers(data.items);
    });
  };

  return <UsersPaginator {...props} />;
};
const mapStateToProps = (state) => {
  return {
    pageSize: getPageSizeSelector(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default connect(mapStateToProps, {
  setCurrentPage,
  toggleIsFetching,
  setUsers,
})(PaginatorContainer);
 */
