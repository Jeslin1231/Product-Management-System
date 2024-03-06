import type React from 'react';
import { useState } from 'react';
import Form from '../Components/form';
import InputGroup from '../Components/inputGroup';
import PurpleButton from '../Components/purpleButton';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const handleSignUp = () => {
    let found = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    if (found) {
      setValidEmail(true);
    } else {
      setEmail('');
      setValidEmail(false);
    }
    found = password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g,
    );
    if (found) {
      setValidPassword(true);
    } else {
      setPassword('');
      setValidPassword(false);
    }
  };
  return (
    <div className="flex h-full justify-center">
      <Form title="Sign up an account">
        <div className="flex flex-col w-3/4 h-3/4 justify-around">
          <InputGroup
            for="email"
            label="Email"
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email@example.com"
            valid={validEmail}
          />
          <InputGroup
            for="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
            valid={validPassword}
          />
          <PurpleButton onClick={handleSignUp} paddingy="3">
            Create account
          </PurpleButton>
          <div className="flex flex-col md:flex-row items-center md:justify-between">
            <p className="text-gray-500 text-sm">
              Already have an account?
              <Link to="/login" className="text-blue-500 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
