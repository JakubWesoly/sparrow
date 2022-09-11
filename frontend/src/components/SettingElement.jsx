import React, { useEffect, useState } from 'react';
import Switch from './Switch';
const SettingElement = (props) => {
  const [input, setInput] = useState(
    (props.type === 'switch' && false) ||
      (props.type === 'text' && '') ||
      (props.type === 'picture' && null)
  );

  const { update } = props;

  useEffect(() => {
    if (update === true) {
      console.log('update');
    }
  }, [update]);

  return (
    <>
      <div className='settings-element'>
        <h2>{props.header}</h2>
        <p>{props.desc}</p>
        {props.type === 'text' && (
          <input
            placeholder={props.header}
            className='settings-element-input input'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        )}
        {props.type === 'picture' && (
          <input
            type='file'
            className='settings-element-input'
            value={input}
            onChange={(e) => setInput(e.target.files[0])}
          />
        )}
        {props.type === 'switch' && (
          <Switch
            className='settings-element-input'
            value={input}
            setValue={setInput}
          />
        )}
      </div>
      <hr />
    </>
  );
};

export default SettingElement;
