import React from 'react';
import './style.less';

function Controls() {
  return (
    <div className="controls-container">
      <div className="play-pause-timeline">
        <i className="iconfont play-pause">&#xe6ac;</i>
        {/* <i className="iconfont play-pause">&#xe6db;</i> */}
        <span className="time-wrap">
          <span className="current-time">02:33</span>
          <span className="time-divider">&nbsp;/&nbsp;</span>
          <span className="total-time">04:20</span>
        </span>
      </div>
      <div className="multifunction">
        <i className="iconfont multifunction-volume">&#xe614;</i>
        <span className="multifunction-quality">720P</span>
        <i className="iconfont multifunction-setting">&#xe71b;</i>
        <i className="iconfont multifunction-fullscreen">&#xe627;</i>
      </div>
    </div>
  );
}

export default Controls;