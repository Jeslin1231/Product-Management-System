import type React from 'react';
import { useState, useEffect } from 'react';
import PrimaryButton from '../Components/PrimaryButton';
import Form from '../Components/form';
import InputGroup from '../Components/inputGroup';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  resetRequestStatus,
  selectRequestStatus,
} from '../features/users/UserSlice';
import { loginUser } from '../features/users/UserThunkApi';
import { selectUserStatus } from '../features/users/UserSlice';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loggedIn = useAppSelector(selectUserStatus);
  useEffect(() => {
    if (loggedIn) {
      navigate('/productlist');
    }
  }, [loggedIn, navigate]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputType, setInputType] = useState('password');
  const [text, setText] = useState('show');

  const loading = useAppSelector(selectRequestStatus);

  if (loading === 'pending') {
    return <div>Login...</div>;
  }

  if (loading === 'rejected') {
    return navigate('/error');
  }

  const handleLogin = () => {
    dispatch(loginUser({ email: email, password: password }));
  };

  const showPasswordButton = (
    <button
      className="absolute right-2 top-2.5 text-gray-500 underline"
      onClick={() => {
        if (inputType === 'password') {
          setText('hide');
          setInputType('text');
        } else {
          setText('show');
          setInputType('password');
        }
      }}
    >
      {text}
    </button>
  );
  return (
    <div className="flex flex-grow justify-center">
      <Form title="Sign in to your account">
        <div className="flex flex-col w-3/4 h-3/4 justify-around">
          <InputGroup
            for="email"
            label="Email"
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email@example.com"
            valid={true}
          />
          <InputGroup
            for="password"
            label="Password"
            type={inputType}
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
            valid={true}
            show={showPasswordButton}
          />
          <PrimaryButton onClick={handleLogin} paddingy="3">
            Login
          </PrimaryButton>
          <div className="flex flex-col md:flex-row items-center md:justify-between">
            <p className="text-gray-500 text-sm">
              Don't have an account?
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
            <Link
              to="/forgetpwd"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
