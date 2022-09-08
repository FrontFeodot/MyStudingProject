import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './../../assets/logo.png';
import style from './Header.module.css';

const Header = (props) => {
  return (
    <header className={style.header}>
      <img className={style.header__img} src={logo} alt='header-img' />
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
