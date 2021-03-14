import React from 'react';
import classNames from '@Utils/classnames';
import sceneJPG from '@Assets/scene.jpg';
import { prefixCls } from './config';
import './QierPlayer.scss';

function QierPlayer() {
  const classes = classNames(`${prefixCls}`, {});
  return (
    <div className={classes}>
      <span>I am QierPlayer</span>
      <img src={sceneJPG} alt='' />
    </div>
  );
}

export default QierPlayer;
