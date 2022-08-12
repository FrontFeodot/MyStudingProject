import style from './preloader.module.css';
import preloader from '../../../assets/preloader.svg';
import React from 'react';
const Preloader = (props) => {
  return (
    <div>
      <img className={style.preloader} src={preloader} alt='load' />
    </div>
  );
};

export default Preloader;
