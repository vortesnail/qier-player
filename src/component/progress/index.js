import React from 'react';
import './style.less';

function Progress() {
  return (
    <div className="progress-container">
      <div className="progress-bg">
        <div className="progress-buffered"></div>
        <div className="progress-played">
          <i className="progress-scrubber"></i>
        </div>
      </div>
    </div>
  );
}

export default Progress;