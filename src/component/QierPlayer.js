import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './style.less';

import Controller from './controller/index';

class QierPlayer extends Component {
  constructor(props) {
    super(props);

    this.lightOffMaskRef = React.createRef();
    this.videoRef = React.createRef();
    this.videoContainerRef = React.createRef();
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
  showVideoQuality: PropTypes.bool,
  src480p: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  src720p: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  src1080p: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  src2k: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  src4k: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  srcOrigin: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

QierPlayer.defaultProps = {
  showVideoQuality: true,
  src480p: false,
  src720p: false,
  src1080p: false,
  src2k: false,
  src4k: false,
  srcOrigin: false
}

export default QierPlayer;