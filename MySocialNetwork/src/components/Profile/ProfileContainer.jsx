import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import {
  getProfile,
  getUserStatus,
  updateUserStatus,
  addPhoto,
} from '../../redux/profile-reducer';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { compose } from 'redux';
import { useEffect } from 'react';
import Preloader from '../common/Preloader/Preloader';

const ProfileContainer = (props) => {
  let navigateUserId = props.router.params.userId;
  let getProfile = props.getProfile;
  let getUserStatus = props.getUserStatus;
  let authorizedId = props.authorizedId;
  let userId = navigateUserId;
  if (!userId) {
    userId = props.authorizedId;
  }
  useEffect(() => {
    if (userId) {
      getProfile(userId);
      getUserStatus(userId);
    }
  }, [navigateUserId, getProfile, getUserStatus, authorizedId, userId]);

  if (!userId) {
    return <Navigate to={'/login'} />;
  }
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <Profile
      profile={props.profile}
      userStatus={props.userStatus}
      updateUserStatus={props.updateUserStatus}
      authorizedId={props.authorizedId}
      params={props.router.params}
      addPhoto={props.addPhoto}
    />
  );
};

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  userStatus: state.profilePage.userStatus,
  authorizedId: state.auth.userId,
  isAuth: state.auth.isAuth,
  isLogin: state.auth.isLogin,
});

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getProfile,
    getUserStatus,
    updateUserStatus,
    addPhoto,
  })
)(ProfileContainer);

/* class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.router.params.userId;

    if (!userId) {
      userId = this.props.authorizedId;
      if (!userId) {
        userId = 24463;
      }
    }
    this.props.getProfile(userId);
    this.props.getUserStatus(userId);
  }

  render() {
    if (!this.props.isAuth) {
      return <Navigate to={'/Login'} />;
    }
    return (
      <Profile
        profile={this.props.profile}
        dataAvailability={this.props.dataAvailability}
        userStatus={this.props.userStatus}
        updateUserStatus={this.props.updateUserStatus}
        authorizedId={this.props.authorizedId}
      />
    );
  }
} */
