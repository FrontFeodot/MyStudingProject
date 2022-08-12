import React from 'react';
import style from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

function DialogItem(props) {
  let path = '/dialogs/' + props.id;
  return (
    <div className={style.dialog + ' ' + style.active}>
      <NavLink to={path}>
        <img
          className={style.img}
          src={props.img}
          alt={`${props.name}'s avatar`}
        />
        {props.name}
      </NavLink>
    </div>
  );
}

export default DialogItem;
