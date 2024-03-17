import type React from 'react';
import { useState } from 'react';
import PrimaryButton from '../Components/PrimaryButton';
import Form from '../Components/form';
import InputGroup from '../Components/inputGroup';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import type { UserPayload } from '../features/users/UserSlice';
import { login } from '../features/users/UserSlice';
import { mockCustomerLoginApi, mockVendorLoginApi } from '../utils/mock';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputType, setInputType] = useState('password');
  const [text, setText] = useState('show');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    mockVendorLoginApi(email, password)
      .then(res => res.json())
      .then(data => {
        const user: UserPayload = {
          id: data.id,
          email: data.email,
          name: data.name,
          role: data.role,
          token: data.token,
        };
        dispatch(login(user));
        navigate('/productlist');
      });
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
    <div className="flex w-screen justify-center">
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
