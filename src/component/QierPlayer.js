import React from 'react';
import './style.less';

import Controller from './controller/index';

import test from './test.mp4';

function QierPlayer() {
  return (
    <div className="qier-player">
      {/* 以下为组件代码 */}
      <figure className="qier-player-container">
        <video className="qier-player">
          <source src={test} type="video/mp4"/>
        </video>
        <Controller />
      </figure>
    </div>
  );
}

export default QierPlayer;