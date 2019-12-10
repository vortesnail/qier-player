import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './style.less';

import Controller from './controller/index';

class QierPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVideoUseful: true,
      isBufferring: false,
    }

    this.lightOffMaskRef = React.createRef();
    this.videoRef = React.createRef();
    this.videoContainerRef = React.createRef();
  }

  componentDidMount() {
    // 设置用户给的视频播放器长宽
    const videoContainerElem = this.videoContainerRef.current;
    videoContainerElem.style.width = typeof this.props.width === "string" ? this.props.width : `${this.props.width}px`;
    videoContainerElem.style.height = typeof this.props.height === "string" ? this.props.height : `${this.props.height}px`;

    const videoElem = this.videoRef.current;
    // 设置定时器检测 3 秒后视频是否可用
    this.timerToCheckVideoUseful = setTimeout(() => {
      // 当视频未初始化时（即不可用时）
      if (videoElem.networkState === 0) {
        // console.log('can not find');
        this.setState({
          isVideoUseful: false,
        })
      }
    }, 3000);
    // 监听是否在缓冲
    videoElem.addEventListener('waiting', (e) => {
      this.changeWaitingState(true);
    });
    // 当开始播放时更改waiting状态
    videoElem.addEventListener('playing', () => {
      this.changeWaitingState(false);
    })
  }

  componentWillUnmount() {
    this.timerToCheckVideoUseful && clearTimeout(this.timerToCheckVideoUseful);
    this.videoRef.current.removeEventListener('waiting');
    this.videoRef.current.removeEventListener('playing');
  }

  changeWaitingState(boolTemp) {
    boolTemp ? 
    this.setState({
      isBufferring: true
    }) :
    this.setState({
      isBufferring: false
    });
  }

  returnVideoSource(videoSrc) {
    return (
      <Fragment>
        <source src={videoSrc} type="video/mp4" /> 
        <source src={videoSrc} type="video/ogg" />
        <source src={videoSrc} type="video/webm" />
      </Fragment>
    )
  }

  render() {
    return (
      <figure
        className="qier-player-container"
        ref={this.videoContainerRef}
      >
        <div className="light-off-mask" ref={this.lightOffMaskRef}></div>
        {
          this.state.isVideoUseful ? '' : <p className="video-no-useful-tip">{this.props.language === 'zh' ? '抱歉！视频找不到了 (｡ ́︿ ̀｡)' : 'Sorry! can not find video (｡ ́︿ ̀｡)'}</p>
        }
        {
          this.state.isBufferring ? <p className="buffering-animation">{this.props.language === 'zh' ? '正在缓冲' : 'Buffering'}<span className="bufferring-dot">...</span></p> : ''
        }
        
        <video
          className="qier-player"
          ref={this.videoRef}
        >
          {this.props.src480p && this.returnVideoSource(this.props.src480p)}
          {this.props.src720p && this.returnVideoSource(this.props.src720p)}
          {this.props.src1080p && this.returnVideoSource(this.props.src1080p)}
          {this.props.src2k && this.returnVideoSource(this.props.src2k)}
          {this.props.src4k && this.returnVideoSource(this.props.src4k)}
          {this.props.srcOrigin && this.returnVideoSource(this.props.srcOrigin)}
          {this.props.language === 'zh' ? '抱歉，该视频已丢失或下载失败' : 'sorry, video lost or download failed.'}
        </video>

        {/* 控制器组件 */}
        <Controller
          {...this.props}
          lightOffMaskRef={this.lightOffMaskRef}
          videoRef={this.videoRef}
          videoContainerRef={this.videoContainerRef}
        />
      </figure>
    );
  }
}

QierPlayer.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  language: PropTypes.string,
  showVideoQuality: PropTypes.bool,
  themeColor: PropTypes.string,
  src480p: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  src720p: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  src1080p: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  src2k: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  src4k: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  srcOrigin: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

QierPlayer.defaultProps = {
  width: 740,
  height: 420,
  language: 'en',
  showVideoQuality: true,
  themeColor: '#f23300',
  src480p: false,
  src720p: false,
  src1080p: false,
  src2k: false,
  src4k: false,
  srcOrigin: false
}

export default QierPlayer;
