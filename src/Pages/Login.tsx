import type React from 'react';
import { useState } from 'react';
import Form from '../Components/form';
import InputGroup from '../Components/inputGroup';
import PurpleButton from '../Components/purpleButton';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="flex h-full justify-center">
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
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
            valid={true}
          />
          <PurpleButton onClick={() => console.log('Login')} paddingy="3">
            Login
          </PurpleButton>
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
