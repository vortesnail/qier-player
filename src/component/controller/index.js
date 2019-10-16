import React from 'react';
import './style.less';

import Progress from '../progress/index';
import Controls from '../controls/index';

function Controller() {
  return (
    <div className="controller-container">
      <Progress />
      <Controls />
    </div>
  );
}

export default Controller;