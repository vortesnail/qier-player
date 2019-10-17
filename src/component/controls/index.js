import React, { Component } from 'react';
import './style.less';
import { secondsToMinutesAndSecondes } from '../../utils/timeControl';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlay: false,
    }
    this.handleChangePlayState = this.handleChangePlayState.bind(this);
  }

  componentDidMount() {
    const videoElem = this.props.videoRef.current;

    // 设置定时器判断是否停止
    this.interval = setInterval(() => {
      videoElem.paused ? this.setState({ isPlay: false }) : this.setState({ isPlay: true });
    }, 100);
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  transTimeFormat(seconds) {
    return secondsToMinutesAndSecondes(seconds);
  }

  handleChangePlayState() {
    if (this.state.isPlay) {
      this.props.videoRef.current.pause();
      this.setState({ isPlay: false })
    }
    if (!this.state.isPlay) {
      this.props.videoRef.current.play();
      this.setState({ isPlay: true })
    }
  }

  render() {
    return (
      <div className="controls-container">
        <div className="play-pause-timeline">
          <i
            onClick={this.handleChangePlayState}
          >{
              this.state.isPlay ?
                <i className="iconfont play-pause">&#xe6db;</i> :
                <i className="iconfont play-pause">&#xe6ac;</i>
            }</i>
          <span className="time-wrap">
            <span className="current-time">{this.transTimeFormat(this.props.videoCurrentTime)}</span>
            <span className="time-divider">&nbsp;/&nbsp;</span>
            <span className="total-time">{this.transTimeFormat(this.props.videoDuration)}</span>
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
}

export default Controls;