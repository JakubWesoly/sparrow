import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/user/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isError) toast.error(message);
    else if (isLoading) toast.isActive('Ładowanie . . .');
    else if (isSuccess || user) navigate('/home');
    dispatch(reset());
  }, [dispatch, navigate, user, isLoading, isSuccess, isError, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div>
      <form className='login' onSubmit={handleSubmit}>
        <h2>Zaloguj się</h2>
        <input
          type='text'
          placeholder='E-Mail'
          className='input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Hasło'
          className='input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit' className='button-primary'>
          Zaloguj
        </button>
      </form>
    </div>
  );
};

export default Login;
