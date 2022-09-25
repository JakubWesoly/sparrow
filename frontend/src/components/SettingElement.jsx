import React, { useEffect, useRef, useState } from 'react';
import Switch from './Switch';
import axios from 'axios';
import Modal from "./Modal";
import {useNavigate} from "react-router-dom";
const SettingElement = (props) => {
  const [input, setInput] = useState(props.type === 'switch' ? false : '');
  const file = useRef(null);

  const navigate = useNavigate();

  const [first, setFirst] = useState(null);
  const [show, setShow] = useState(false);

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
      ).catch(err => {props.setFailed(true);});
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
        })
        .catch(err => {props.setFailed(true);})
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
        .catch((err) => {props.setFailed(true)});
    }
  }, [update]);

  const handleDelete = async() => {
    await axios.delete(`/api/users/delete`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    });
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  }

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
          {props.type === 'button' && (
              <>
            <div className='settings-element-input'>
                <button className='button-primary' onClick={() => setShow(true)}>
                    Usuń
                </button>

            </div>
            <Modal isShown={show} isShownHandler={setShow}>
                <div className='delete-account-form'>
                        <h2>Czy na pewno chcesz usunąć konto?</h2>
                        <button className={'button-primary'} onClick={handleDelete }>Tak</button>
                </div>
            </Modal>
              </>
          )
          }
      </div>
      <hr />
    </>
  );
};

export default SettingElement;
