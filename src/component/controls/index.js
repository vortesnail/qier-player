import React, { Component } from 'react';
import './style.less';
import { secondsToMinutesAndSecondes } from '../../utils/timeControl';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHoverToVolume: false,
      isHoverToVolumePopbox: false,

      isMuted: false,
      isPlay: false,
      volume: 100,
      isSlideVolume: false,
    }

    this.tempVolume = 100;

    this.changeIsVolumeHoverToTrue = this.changeIsVolumeHoverToTrue.bind(this);
    this.changeIsVolumeHoverToFalse = this.changeIsVolumeHoverToFalse.bind(this);

    this.volumeSliderMirror = React.createRef();
    this.handleChangePlayState = this.handleChangePlayState.bind(this);
    this.changeCurrentVolume = this.changeCurrentVolume.bind(this);
    this.slideCurrentVolume = this.slideCurrentVolume.bind(this);
    this.clearVolumeInterval = this.clearVolumeInterval.bind(this);
    this.setIsMute = this.setIsMute.bind(this);
    this.changeIsHoverToPopboxToTrue = this.changeIsHoverToPopboxToTrue.bind(this);
    this.changeIsHoverToPopboxToFalse = this.changeIsHoverToPopboxToFalse.bind(this);
  }

  changeIsVolumeHoverToTrue() {
    this.setState({
      isHoverToVolume: true
    })
  }

  changeIsVolumeHoverToFalse() {
    this.timeoutVolume = setTimeout(() => {
      if (!this.state.isHoverToVolumePopbox && !this.state.isSlideVolume) {
        this.setState({
          isHoverToVolume: false
        })
      }
    }, 200);
  }

  componentDidMount() {
    window.addEventListener('mouseup', () => {
      this.whenMouseUpDo();
    })

    const videoElem = this.props.videoRef.current;

    // 设置定时器判断是否停止
    this.interval = setInterval(() => {
      videoElem.paused ? this.setState({ isPlay: false }) : this.setState({ isPlay: true });
    }, 1);
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
    window.removeEventListener('mouseup');
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

  changeCurrentVolume(e) {
    // 获取音量区域高度
    const volumeAreaHeight = this.volumeSliderMirror.current.offsetHeight;
    // 获取当前位置在整个音量区域高度的占比
    const volumePercent = 1 - (e.clientY - this.volumeSliderMirror.current.getBoundingClientRect().top) / volumeAreaHeight;
    // 修改当前音量大小
    this.updateCurrentVolume(volumePercent);
  }

  slideCurrentVolume() {
    // 获取音量区域高度
    const volumeAreaHeight = this.volumeSliderMirror.current.offsetHeight;
    this.volumeInterval = setInterval(() => {
      // 获取当前位置在整个音量区域高度的占比
      const volumePercent = 1 - (this.props.windowClientY - this.volumeSliderMirror.current.getBoundingClientRect().top) / volumeAreaHeight;
      // 修改当前音量大小
      this.updateCurrentVolume(volumePercent);
      this.setState({
        isSlideVolume: true
      })
    }, 1);
  }

  updateCurrentVolume(volumePercent) {
    if (volumePercent >= 0 && volumePercent <= 1) {
      this.props.videoRef.current.volume = volumePercent;
      this.props.videoRef.current.muted = false;
      this.setState({
        volume: volumePercent * 100
      })
      Math.floor(volumePercent * 100) === 0 ? this.setState({ isMuted: true }) : this.setState({ isMuted: false })
    }
    if (volumePercent < 0) {
      this.props.videoRef.current.volume = 0;
      this.setState({
        volume: 0,
        isMuted: true
      })
    }
    if (volumePercent > 1) {
      this.props.videoRef.current.volume = 1;
      this.setState({
        volume: 100
      })
    }
  }

  clearVolumeInterval() {
    this.whenMouseUpDo();
  }

  whenMouseUpDo() {
    this.volumeInterval && clearInterval(this.volumeInterval);
    this.setState({
      isSlideVolume: false,
    })
    if (!this.state.isHoverToVolumePopbox) {
      this.setState({
        isHoverToVolume: false
      })
    }
  }

  setIsMute(e) {
    // 防止冒泡
    if (e.target == e.currentTarget) {
      if (this.state.isMuted) {
        this.props.videoRef.current.muted = false;
        this.setState({
          volume: this.tempVolume,
          isMuted: false,
          isHoverToVolume: true
        })
      }
      if (!this.state.isMuted) {
        this.props.videoRef.current.muted = true;
        this.tempVolume = this.state.volume;
        this.setState({
          volume: 0,
          isMuted: true,
          isHoverToVolume: true
        })
      }
    }
  }

  changeIsHoverToPopboxToTrue() {
    this.setState({
      isHoverToVolumePopbox: true,
    })
  }

  changeIsHoverToPopboxToFalse() {
    this.setState({
      isHoverToVolumePopbox: false
    })
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
            }
          </i>
          <span className="time-wrap">
            <span className="current-time">{this.transTimeFormat(this.props.videoCurrentTime)}</span>
            <span className="time-divider">&nbsp;/&nbsp;</span>
            <span className="total-time">{this.transTimeFormat(this.props.videoDuration)}</span>
          </span>
        </div>
        <div className="multifunction">
          <i
            className="multifunction-volume"
            onMouseEnter={this.changeIsVolumeHoverToTrue}
            onMouseLeave={this.changeIsVolumeHoverToFalse}
            
          >{
            this.state.isMuted ? 
            <i className="iconfont volume" onClick={this.setIsMute}>&#xe71c;</i> : 
            <i className="iconfont volume" onClick={this.setIsMute}>&#xe614;</i>}
            {
              this.state.isHoverToVolume ?
                <div 
                  className="volume-box"
                  onMouseEnter={this.changeIsHoverToPopboxToTrue}
                  onMouseLeave={this.changeIsHoverToPopboxToFalse}
                >
                  <p className="current-volume"><span className="volume-value">{Math.floor(this.state.volume)}</span></p>
                  <div className="volume-slider">
                    <div className="volume-slider-bg">
                      <div
                        className="volume-slider-mirror"
                        ref={this.volumeSliderMirror}
                        onClick={this.changeCurrentVolume}
                        onMouseDown={this.slideCurrentVolume}
                        onMouseUp={this.clearVolumeInterval}
                      ></div>
                      <div
                        className="volume-slider-op"
                        style={{ height: `${this.state.volume}%` }}
                      >
                        <div className="volume-slider-op-circle"></div>
                      </div>
                    </div>
                  </div>
                </div> : ''
            }

          </i>
          <span className="multifunction-quality">720P</span>
          <i className="iconfont multifunction-setting">&#xe71b;</i>
          <i className="iconfont multifunction-fullscreen">&#xe627;</i>
        </div>
      </div>
    );
  }
}

export default Controls;