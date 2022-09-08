import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { addPhoto, getProfile } from '../../redux/profile-reducer';
import { saveProfile } from '../../redux/settings-reducer';
import Preloader from '../common/Preloader/Preloader';
import Settings from './Settings';

const SettingsContainer = ({ isAuth, authorizedId, getProfile, ...props }) => {
  useEffect(() => {
    if (isAuth) {
      getProfile(authorizedId);
    }
  }, [authorizedId, getProfile, isAuth]);

  if (!isAuth) {
    return <Navigate to={'/Login'} />;
  }
  return (
    <>
      {!props.profile || props.myId !== props.profile.userId ? (
        <Preloader />
      ) : (
        <Settings
          profile={props.profile}
          addPhoto={props.addPhoto}
          saveProfile={props.saveProfile}
          errorMessage={props.errorMessage}
        />
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  authorizedId: state.auth.userId,
  myId: state.auth.userId,
  isAuth: state.auth.isAuth,
  errorMessage: state.settings.errorMessage,
});
export default connect(mapStateToProps, { addPhoto, getProfile, saveProfile })(
  SettingsContainer
);
