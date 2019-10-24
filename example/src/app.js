import React from 'react';
import ReactDOM from 'react-dom';
import QierPlayer from '../../src/component/QierPlayer';
import video720p from './video720p.mp4';

ReactDOM.render(<QierPlayer src720p={video720p}/>, document.getElementById('root'));