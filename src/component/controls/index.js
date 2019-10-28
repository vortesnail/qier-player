import React, { Component } from 'react';
import screenfull from 'screenfull'
import './style.less';
import { secondsToMinutesAndSecondes } from '../../utils/timeControl';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHoverToVolume: false,
      isHoverToVolumePopbox: false,
      isHoverToQuality: false,
      isHoverToQualityPopbox: false,
      isHoverToSetting: false,
      isHoverToSettingPopbox: false,

      isLightOff: false,
      isMuted: false,
      isPlay: false,
      volume: 100,
      isSlideVolume: false,
      currentQuality: '清晰度',
      isScreentFull: false
    }

    this.tempVolume = 100;
    this.controlContainerWidth = 740;
    this.controlContainerHeight = 420;

    this.changeIsVolumeHoverToTrue = this.changeIsVolumeHoverToTrue.bind(this);
    this.changeIsVolumeHoverToFalse = this.changeIsVolumeHoverToFalse.bind(this);
    this.changeIsQualityHoverToTrue = this.changeIsQualityHoverToTrue.bind(this);
    this.changeIsQualityHoverToFalse = this.changeIsQualityHoverToFalse.bind(this);
    this.changeIsSettingHoverToTrue = this.changeIsSettingHoverToTrue.bind(this);
    this.changeIsSettingHoverToFalse = this.changeIsSettingHoverToFalse.bind(this);

    this.volumeSliderMirror = React.createRef();

    this.handleChangePlayState = this.handleChangePlayState.bind(this);
    this.changeCurrentVolume = this.changeCurrentVolume.bind(this);
    this.slideCurrentVolume = this.slideCurrentVolume.bind(this);
    this.clearVolumeInterval = this.clearVolumeInterval.bind(this);
    this.setIsMute = this.setIsMute.bind(this);
    this.changeIsHoverToVolumePopboxToTrue = this.changeIsHoverToVolumePopboxToTrue.bind(this);
    this.changeIsHoverToVolumePopboxToFalse = this.changeIsHoverToVolumePopboxToFalse.bind(this);
    this.requestFullScreen = this.requestFullScreen.bind(this);
    this.selectVideoQuality = this.selectVideoQuality.bind(this);
    this.changeIsHoverToQualityPopboxToTrue = this.changeIsHoverToQualityPopboxToTrue.bind(this);
    this.changeIsHoverToQualityPopboxToFalse = this.changeIsHoverToQualityPopboxToFalse.bind(this);
    this.changeIsHoverToSettingPopboxToTrue = this.changeIsHoverToSettingPopboxToTrue.bind(this);
    this.changeIsHoverToSettingPopboxToFalse = this.changeIsHoverToSettingPopboxToFalse.bind(this);
    this.selectPlayRate = this.selectPlayRate.bind(this);
    this.lightOffModeSwitch = this.lightOffModeSwitch.bind(this);
    this.showVolumeBox = this.showVolumeBox.bind(this);
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
    }, 100);
  }

  changeIsQualityHoverToTrue() {
    this.setState({
      isHoverToQuality: true
    })
  }

  changeIsQualityHoverToFalse() {
    this.timeoutQuality = setTimeout(() => {
      if (!this.state.isHoverToQualityPopbox) {
        this.setState({
          isHoverToQuality: false
        })
      }
    }, 200);
  }

  changeIsSettingHoverToTrue() {
    this.setState({
      isHoverToSetting: true
    })
  }

  changeIsSettingHoverToFalse() {
    this.timeoutSetting = setTimeout(() => {
      if (!this.state.isHoverToSettingPopbox) {
        this.setState({
          isHoverToSetting: false
        })
      }
    }, 200);
  }

  componentDidMount() {
    window.addEventListener('mouseup', () => {
      this.whenMouseUpDo();
    })

    const videoElem = this.props.videoRef.current;

    // 设置定时器判断 video 是否停止
    this.interval = setInterval(() => {
      videoElem.paused ? this.setState({ isPlay: false }) : this.setState({ isPlay: true });
    }, 1);

    // 当全屏\全屏状态发生变化时
    screenfull.on('change', () => {
      if (screenfull.isFullscreen) {
        this.setState({isScreentFull: true})
      } else {
        this.props.controllerContainerRef.current.style.width = `${this.controlContainerWidth}px`;
        this.props.controllerContainerRef.current.style.height = `${this.controlContainerHeight}px`
        this.props.progressAndControlsWrapRef.current.style.width = 'calc((100% - 26px))';
        this.setState({isScreentFull: false});
      }
    });

    // 快捷键
    document.onkeydown = () => {
      if('play-or-pause-mask' === document.activeElement.id) {
        const keyCode = window.event.keyCode;
        if(!window.event.altKey && !window.event.ctrlKey) {
          let currentVolumePercent = videoElem.volume;
          switch (keyCode) {
            case 38:                            // ⬆
              currentVolumePercent += 0.05;
              this.showVolumeBox(currentVolumePercent);
              break;
            case 40:                            // ⬇
              currentVolumePercent -= 0.05;
              this.showVolumeBox(currentVolumePercent);
              break;
            case 37:                            // ⬅
              videoElem.currentTime -= 3;
              break;
            case 39:                            // ➡
              videoElem.currentTime += 3;
              break;
            case 32:                            // space
              this.handleChangePlayState();
              break;
            default:
              break;
          }
        }
      }
    }
  }

  showVolumeBox(currentVolumePercent) {
    let volumeBoxElem = this.props.volumeBoxRef.current;
    volumeBoxElem.classList.remove("show-animation");
    // 这句话异常重要，不然你会发现 remove 不掉 class
    // 参考：https://css-tricks.com/restart-css-animation/
    void volumeBoxElem.offsetWidth;
    let p = new Promise(resolve => {
      this.updateCurrentVolume(currentVolumePercent);
      resolve();
    })
    p.then(() => {
      volumeBoxElem.classList.add("show-animation");
    })
  }

  componentWillUnmount() {
    // 清除定时器和事件监听
    this.interval && clearInterval(this.interval);
    this.timeoutVolume && clearTimeout(this.timeoutVolume);
    this.timeoutQuality && clearTimeout(this.timeoutQuality);
    this.timeoutSetting && clearTimeout(this.timeoutSetting);
    window.removeEventListener('mouseup');
    screenfull.off('change');
  }

  transTimeFormat(seconds) {
    return secondsToMinutesAndSecondes(seconds);
  }

  handleChangePlayState() {
    if (this.state.isPlay) {
      this.props.videoRef.current.pause();
      this.setState({ isPlay: false })
      // 这条 return 语句必须的加，不然下面的代码也会执行。。
      // 黑科技。。
      // 不是说 setState 是异步吗？？？
      return;
    }
    if (!this.state.isPlay) {
      this.props.videoRef.current.play();
      this.setState({ isPlay: true })
    }
  }

  // 改变当前音量
  changeCurrentVolume(e) {
    // 获取音量区域高度
    const volumeAreaHeight = this.volumeSliderMirror.current.offsetHeight;
    // 获取当前位置在整个音量区域高度的占比
    const volumePercent = 1 - (e.clientY - this.volumeSliderMirror.current.getBoundingClientRect().top) / volumeAreaHeight;
    // 修改当前音量大小
    this.updateCurrentVolume(volumePercent);
  }

  // 滑动音量控制条
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

  // 更新当前音量控制条
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

  // 当鼠标抬起时
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

  changeIsHoverToVolumePopboxToTrue() {
    this.setState({
      isHoverToVolumePopbox: true,
    })
  }

  changeIsHoverToVolumePopboxToFalse() {
    this.setState({
      isHoverToVolumePopbox: false
    })
  }

  // 请求获得全屏状态
  requestFullScreen() {
    const videoElem = this.props.videoContainerRef.current;
    if (this.state.isScreentFull) {
      screenfull.exit();
    } else {
      if (screenfull.isEnabled) {
        setTimeout(() => {
          this.props.controllerContainerRef.current.style.width = 'calc(100vw - 2px)';
          this.props.controllerContainerRef.current.style.height = 'calc(100vh - 2px)';
          this.props.progressAndControlsWrapRef.current.style.width = '100vw';
        }, 100);
        screenfull.request(videoElem);
      } else {
        alert("Sorry, present video can't fullscreen.");
      }
    }
  }

  changeIsHoverToQualityPopboxToTrue() {
    this.setState({
      isHoverToQualityPopbox: true,
    })
  }

  changeIsHoverToQualityPopboxToFalse() {
    this.setState({
      isHoverToQualityPopbox: false
    })
  }

  // 选取视频清晰度
  selectVideoQuality(e) {
    const videoEle = this.props.videoRef.current;
    // 记录当前播放到的时间
    const videoCurTimeTemp = videoEle.currentTime;
    // 记录当前视频是否暂停
    const videoPlayState = videoEle.paused;
    const currentQulityStr = e.target.getAttribute("id");
    // 转换当前视频清晰度
    videoEle.src = this.props[`src${e.target.getAttribute("id")}`];
    switch (currentQulityStr) {
      case 'Origin':
        this.setState({ currentQuality: '原画' });
        break;
      case '4k':
        this.setState({ currentQuality: '4K' });
        break;
      case '2k':
        this.setState({ currentQuality: '2K' });
        break;
      case '1080p':
        this.setState({ currentQuality: '1080P' });
        break;
      case '720p':
        this.setState({ currentQuality: '720P' });
        break;
      case '480p':
        this.setState({ currentQuality: '480P' });
        break;
      default:
        this.setState({ currentQuality: '无' })
        break;
    }
    videoEle.currentTime = videoCurTimeTemp;
    videoPlayState ? videoEle.pause() : videoEle.play();
  }

  changeIsHoverToSettingPopboxToTrue() {
    this.setState({
      isHoverToSettingPopbox: true,
    })
  }

  changeIsHoverToSettingPopboxToFalse() {
    this.setState({
      isHoverToSettingPopbox: false,
    })
  }

  selectPlayRate(e) {
    const videoEle = this.props.videoRef.current;
    const currentPlayRateStr = e.target.getAttribute("id");
    videoEle.playbackRate = Number(currentPlayRateStr);
  }

  lightOffModeSwitch(e) {
    const lightOffMaskElem = this.props.lightOffMaskRef.current;
    if (this.state.isLightOff) {
      lightOffMaskElem.style.display = 'none';
      this.setState({
        isLightOff: false
      })
      return;
    }
    lightOffMaskElem.style.display = 'block';
    this.setState({
      isLightOff: true
    })
  }

  render() {
    return (
      <div className="controls-container" style={{ opacity: `${this.props.isShowController ? 1 : 0}` }}>
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

          >{this.state.isMuted ?
            <i className="iconfont volume" onClick={this.setIsMute}>&#xe71c;</i> :
            <i className="iconfont volume" onClick={this.setIsMute}>&#xe614;</i>}
            {
              this.state.isHoverToVolume ?
                <div
                  className="volume-box"
                  onMouseEnter={this.changeIsHoverToVolumePopboxToTrue}
                  onMouseLeave={this.changeIsHoverToVolumePopboxToFalse}
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
          {
            this.props.showVideoQuality ?
              <span
                className="multifunction-quality"
                onMouseEnter={this.changeIsQualityHoverToTrue}
                onMouseLeave={this.changeIsQualityHoverToFalse}
              ><span className="quality">{this.state.currentQuality}</span>
                {
                  this.state.isHoverToQuality ?
                    <div
                      className="quality-box"
                      onClick={this.selectVideoQuality}
                      onMouseEnter={this.changeIsHoverToQualityPopboxToTrue}
                      onMouseLeave={this.changeIsHoverToQualityPopboxToFalse}
                    >
                      {this.props.srcOrigin && <div className="quality-value" id="Origin">原画</div>}
                      {this.props.src4k && <div className="quality-value" id="4k">4K</div>}
                      {this.props.src2k && <div className="quality-value" id="2k">2K</div>}
                      {this.props.src1080p && <div className="quality-value" id="1080p">1080P</div>}
                      {this.props.src720p && <div className="quality-value" id="720p">720P</div>}
                      {this.props.src480p && <div className="quality-value" id="480p">480P</div>}
                    </div> : ''
                }
              </span> : ''
          }
          <i
            className="multifunction-setting"
            onMouseEnter={this.changeIsSettingHoverToTrue}
            onMouseLeave={this.changeIsSettingHoverToFalse}
          ><i className="iconfont setting">&#xe71b;</i>
            {
              this.state.isHoverToSetting ?
                <div
                  className="setting-box"
                  onMouseEnter={this.changeIsHoverToSettingPopboxToTrue}
                  onMouseLeave={this.changeIsHoverToSettingPopboxToFalse}
                >
                  <div
                    className="play-rate"
                    onClick={this.selectPlayRate}
                  >
                    <p className="setting-title play-rate-title">播放速度:</p>
                    <li className="play-rate-value" id="0.5">0.5</li>
                    <li className="play-rate-value" id="0.75">0.75</li>
                    <li className="play-rate-value" id="1">1</li>
                    <li className="play-rate-value" id="1.25">1.25</li>
                    <li className="play-rate-value" id="1.5">1.5</li>
                    <li className="play-rate-value" id="2">2</li>
                  </div>
                  <div className="light-off-mode">
                    <p className="setting-title light-off-mode-title">其他设置:</p>
                    <p
                      className="light-off-mode-switch"
                      onClick={this.lightOffModeSwitch}
                    >关灯模式&nbsp;{this.state.isLightOff ? <span className="iconfont">&#xe666;</span> : ''}</p>
                  </div>
                </div> : ''
            }

          </i>
          <i
            className="iconfont multifunction-fullscreen"
            onClick={this.requestFullScreen}
          >&#xe627;</i>
        </div>
      </div>
    );
  }
}

export default Controls;