import React from 'react';
import './index.scss';

function parse(object: { [propName: string]: any }) {
  return {
    asdasd: 'asdasd',
    ...object,
  };
}

function Header() {
  const name = 'vortesnail';
  parse({
    name,
    age: 18,
  });
  return (
    <div className='Header'>
      <span>I am header {name}</span>
    </div>
  );
}

export default Header;
