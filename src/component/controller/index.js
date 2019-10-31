import React, { Component } from 'react';
import './style.less';

import Progress from '../progress/index';
import Controls from '../controls/index';
import 'hover-seconds-do';

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
    this.controllerContainerRef = React.createRef();
    this.progressAndControlsWrapRef = React.createRef();
    this.playOrPauseMaskRef = React.createRef();
    this.volumeBoxRef = React.createRef();

    this.handleShowController = this.handleShowController.bind(this);
    this.handleHideController = this.handleHideController.bind(this);
    this.handlePlayOrPauseVideo = this.handlePlayOrPauseVideo.bind(this);
    this.setKeycode = this.setKeycode.bind(this);
    this.removeKeycode = this.removeKeycode.bind(this);
    this.hideControlAndMouse = this.hideControlAndMouse.bind(this);
    this.showControlAndMouse = this.showControlAndMouse.bind(this);
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

    // 给 playOrPauseMaskRef 添加监听，实现悬停 n 秒控制栏消失
    this.hoversd = new window.HoverSD(this.playOrPauseMaskRef.current, this.hideControlAndMouse, 1800, this.showControlAndMouse);
    this.hoversd.secondsHoverEX();
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
    this.hoversd.removeElemEventListener();
  }

  // 当悬浮超过一定时间 鼠标消失，控制栏消失
  hideControlAndMouse() {
    this.handleHideController();
    this.playOrPauseMaskRef.current.style.cursor = 'none';
  }
  // 正常情况下，鼠标恢复，控制栏恢复
  showControlAndMouse() {
    this.handleShowController();
    this.playOrPauseMaskRef.current.style.cursor = 'pointer';
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

  setKeycode(e) {

  }

  removeKeycode() {

  }


  render() {
    return (
        <div
          className="controller-container"
          ref={this.controllerContainerRef}
          onMouseEnter={this.handleShowController}
          onMouseLeave={this.handleHideController}
        >
          <div 
            id="play-or-pause-mask"
            className="click-to-play-or-pause" 
            ref={this.playOrPauseMaskRef}
            onClick={this.handlePlayOrPauseVideo}
            onFocus={this.setKeycode}
            tabIndex="0"
            onBlur={this.removeKeycode}
          ></div>
          {
            this.props.videoRef.current ? 
              (this.props.videoRef.current.paused ? 
                <i className="iconfont play-icon">&#xe6ac;</i> : '') : ''
          }
          <div className="progress-and-controls-wrap" ref={this.progressAndControlsWrapRef}>
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
              controllerContainerRef={this.controllerContainerRef}
              progressAndControlsWrapRef={this.progressAndControlsWrapRef}
              volumeBoxRef={this.volumeBoxRef}
            />
          </div>
          <div className="volume-show-box" ref={this.volumeBoxRef}>
            <i className="iconfont">&#xe614;</i>
            <span className="volume-percent">{this.props.videoRef.current ? Math.floor(this.props.videoRef.current.volume * 100) : ''}%</span>
          </div>
        </div>
    );
  }

}

export default Controller;