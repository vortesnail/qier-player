import React, { Component } from 'react';
import './style.less';

import Controller from './controller/index';

import test1 from './test1.mp4';
import test2 from './test2.mp4';
 
class QierPlayer extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  render() {
    return (
      <div className="qier-player-bg">
        {/* 以下为组件代码 */}
        <figure className="qier-player-container">
          <video 
            className="qier-player"
            ref={this.videoRef}
          >
            <source src={test2} type="video/mp4"/>
          </video>
          {/* 控制器组件 */}
          <Controller 
            videoRef={this.videoRef}
            
          />
        </figure>
      </div>
    );
  } 
}

export default QierPlayer;