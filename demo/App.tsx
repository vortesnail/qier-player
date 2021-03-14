import React from 'react';
import Header from '@Src/Header';
import cat from './cat.jpg';

interface IProps {
  name: string;
  age: number;
}

function App(props: IProps) {
  const { name, age } = props;

  return (
    <div className='app'>
      <Header />
      <img src={cat} alt='' style={{ width: 100 }} />
      <span>{`Hello! I'm ${name}, ${age} years old.`}</span>
    </div>
  );
}

export default App;
