import React, { Component } from 'react';
import './style.less';

import Progress from '../progress/index';
import Controls from '../controls/index';

class Controller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      bufferedTime: 0,
      showController: false,
      showController: false
    }

    this.handleShowController = this.handleShowController.bind(this);
    this.handleHideController = this.handleHideController.bind(this);
    this.handlePlayOrPauseVideo = this.handlePlayOrPauseVideo.bind(this);
  }

  componentDidMount() {
    // 将这window的move事件所得值传递给子组件
    window.addEventListener('mousemove', (e) => {
      this.windowClientX = e.clientX;
      this.windowClientY = e.clientY;
    })

    const videoElem = this.props.videoRef.current;
    videoElem.oncanplay = () => {
      this.setState({
        duration: videoElem.duration
      })
    }

    // 当视频正在被缓冲，计算已缓冲条
    videoElem.onprogress = () => {
      if (videoElem.buffered.length >= 1) {
        this.setState({
          bufferedTime: videoElem.buffered.end(0)
        })
      }
    }

    // 定时器用于更新当前视频时间
    this.interval = setInterval(() => {
      this.setState({
        currentTime: videoElem.currentTime,
      })
    }, 1);
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  handleShowController() {
    this.setState({
      showController: true
    })
  }

  handleHideController() {
    this.setState({
      showController: false
    })
  }

  handlePlayOrPauseVideo() {
    const videoElem = this.props.videoRef.current;
    videoElem.paused ? videoElem.play() : videoElem.pause();
  }

  render() {
    return (
        <div
          className="controller-container"
          onMouseEnter={this.handleShowController}
          onMouseLeave={this.handleHideController}
        >
          <div className="click-to-play-or-pause" onClick={this.handlePlayOrPauseVideo}></div>
          {
            this.props.videoRef.current ? 
              (this.props.videoRef.current.paused ? 
                <i className="iconfont play-icon">&#xe6ac;</i> : '') : ''
          }
          <div className="progress-and-controls-wrap">
            <Progress
              {...this.props}
              videoCurrentTime={this.state.currentTime}
              videoDuration={this.state.duration}
              videoBufferedTime={this.state.bufferedTime}
              windowClientX={this.windowClientX}
              windowClientY={this.windowClientY}
              isShowController={this.state.showController}
            />
            <Controls
              {...this.props}
              videoCurrentTime={this.state.currentTime}
              videoDuration={this.state.duration}
              windowClientX={this.windowClientX}
              windowClientY={this.windowClientY}
              isShowController={this.state.showController}
            />
          </div>
        </div>
    );
  }

}

export default Controller;