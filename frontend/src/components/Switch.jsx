import React from 'react';

const Switch = (props) => {
  const { value, setValue } = props;

  const styleOff = {
    backgroundColor: '#000',
  };
  const styleBallOff = {
    left: '7px',
  };

  const styleOn = {
    backgroundColor: 'rgb(204, 51, 51)',
  };
  const styleBallOn = {
    left: '30px',
  };

  return (
    <div
      className='switch '
      style={value ? styleOn : styleOff}
      onClick={() => setValue(!value)}
    >
      <div className='switch-ball' style={value ? styleBallOn : styleBallOff} />
    </div>
  );
};

export default Switch;
