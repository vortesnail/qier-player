import React from 'react';
import Header from '@Src/Header';

interface IProps {
  name: string;
  age: number;
}

function App(props: IProps) {
  const { name, age } = props;

  return (
    <div className='app'>
      <Header />
      <span>{`Hello! I'm ${name}, ${age} years old.`}</span>
    </div>
  );
}

export default App;
