import React, { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { connect } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import Media from './components/Media/Media';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import SettingsContainer from './components/Settings/SettingsContainer';
import UsersContainer from './components/Users/UsersContainer';
import { initializeApp } from './redux/app-reducer';

const Login = React.lazy(() => import('./components/Login/Login'));
const ChatPage = React.lazy(() => import('./components/Chat/ChatPage'));

const App = ({ initializeApp, initialized, isAuth }) => {
  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  window.addEventListener(
    'unhandledrejection',
    function (promiseRejectionEvent) {
      this.window.HTMLBodyElement = <div>ERROR</div>;
    }
  );

  if (!initialized) {
    return <Preloader />;
  }

  return (
    <div className='app-wrapper'>
      <HeaderContainer />
      <Navbar />
      <div className='app-wrapper-content'>
        <Suspense
          fallback={
            <div>
              <Preloader />
            </div>
          }
        >
          <Routes>
            <Route path='/profile/:userId' element={<ProfileContainer />} />
            <Route path='/profile/*' element={<ProfileContainer />} />
            <Route path='/users' element={<UsersContainer />} />
            <Route path='/Media' element={<Media isAuth={isAuth} />} />
            <Route path='/settings' element={<SettingsContainer />} />
            <Route path='/login' element={<Login />} />
            <Route path='/chat' element={<ChatPage />} />
            <Route path='/' element={<Navigate to='/profile' />} />
            <Route path='*' element={<div>404 NOT FOUND</div>} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps, { initializeApp })(App);
