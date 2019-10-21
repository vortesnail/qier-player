import React, { Component } from 'react';
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
          {this.props.src480p && <source src={this.props.src480p} type="video/mp4" />}
          {this.props.src720p && <source src={this.props.src720p} type="video/mp4" />}
          {this.props.src1080p && <source src={this.props.src1080p} type="video/mp4" />}
          {this.props.src2k && <source src={this.props.src2k} type="video/mp4" />}
          {this.props.src4k && <source src={this.props.src4k} type="video/mp4" />}
          {this.props.srcOrigin && <source src={this.props.srcOrigin} type="video/mp4" />}
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

// module.exports =  QierPlayer;
export default QierPlayer;