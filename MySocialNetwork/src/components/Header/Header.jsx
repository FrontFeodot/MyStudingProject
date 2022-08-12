import React from 'react';
import { NavLink } from 'react-router-dom';

import style from './Header.module.css';

const Header = (props) => {
  return (
    <header className={style.header}>
      <img
        className={style.header__img}
        src='https://play-lh.googleusercontent.com/ahJtMe0vfOlAu1XJVQ6rcaGrQBgtrEZQefHy7SXB7jpijKhu1Kkox90XDuH8RmcBOXNn'
        alt='header-img'
      />
      <div className={style.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={props.logout}>Log Out</button>
          </div>
        ) : (
          <NavLink to={'/login'} onClick={props.authMe}>
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
