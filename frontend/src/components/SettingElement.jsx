import React, { useEffect, useRef, useState } from 'react';
import Switch from './Switch';
import axios from 'axios';
const SettingElement = (props) => {
  const [input, setInput] = useState(props.type === 'switch' ? false : '');
  const file = useRef(null);

  const [first, setFirst] = useState(null);

  useEffect(() => {
    if (props.type !== 'switch') return;
    const getSetting = async () => {
      setInput(
        (
          await axios.get(`/api/users/get-setting/${props.setting}`, {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem('user')).token
              }`,
            },
          })
        ).data.setting
      );
      setFirst(
        (
          await axios.get(`/api/users/get-setting/${props.setting}`, {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem('user')).token
              }`,
            },
          })
        ).data.setting
      );
    };
    getSetting();
  }, []);

  const { update } = props;
  useEffect(() => {
    if (!update) {
      return;
    }
    if (
      input === first ||
      (props.type === 'text' && input === '') ||
      (file.current && file.current.files[0] == null)
    ) {
      console.log('nie zmieniono');
      return;
    }
    if (props.type === 'text') {
      axios.put(
        '/api/users/settings',
        { name: props.setting, value: input },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          },
        }
      );
    } else if (props.type === 'switch') {
      axios.put(
        '/api/users/settings',
        { name: props.setting, value: input },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          },
        }
      );
    } else if (props.type === 'picture') {
      const CLOUDINARY_URL =
        'https://api.cloudinary.com/v1_1/dhk6z5vzz/image/upload';
      const CLOUDINARY_UPLOAD_PRESET = 'eebchsaz';
      const formData = new FormData();
      formData.append('file', file.current.files[0]);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      axios
        .post(CLOUDINARY_URL, formData)
        .then((res) => {
          if (res.data.secure_url !== '') {
            axios.put(
              '/api/users/settings',
              { name: props.setting, value: res.data.secure_url },
              {
                headers: {
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem('user')).token
                  }`,
                },
              }
            );
          }
        })
        .catch((err) => console.error(err));
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
          <input type='file' className='settings-element-input' ref={file} />
        )}
        {props.type === 'switch' && (
          <div className='settings-element-input'>
            <Switch value={input} setValue={setInput} />
          </div>
        )}
      </div>
      <hr />
    </>
  );
};

export default SettingElement;
