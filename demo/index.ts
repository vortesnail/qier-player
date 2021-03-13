import './index.scss';
import cat from './cat.jpg';

const root = document.querySelector('#root');
const a = 'sdasd';
const image = document.createElement('img');
image.src = cat;
root.append(image);
// root.innerHTML = 'hello, webpack!sss';
