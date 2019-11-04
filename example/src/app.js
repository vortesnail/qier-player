import React from 'react';
import ReactDOM from 'react-dom';
import QierPlayer from '../../src/component/QierPlayer';
import video720p from './video720p.mp4';
import './app.css';

ReactDOM.render(<QierPlayer src720p={video720p} srcOrigin={video720p}/>, document.getElementById('root'));