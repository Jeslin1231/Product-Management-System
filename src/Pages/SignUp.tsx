import type React from 'react';
import { useState, useEffect } from 'react';
import Form from '../Components/form';
import InputGroup from '../Components/inputGroup';
import PrimaryButton from '../Components/PrimaryButton';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  selectUserStatus,
  selectRequestStatus,
} from '../features/users/UserSlice';
import { signupUser } from '../features/users/UserThunkApi';

type Role = 'customer' | 'vendor';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(selectUserStatus);
  useEffect(() => {
    if (loggedIn) {
      navigate('/productlist');
    }
  }, [loggedIn, navigate]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');

  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const loading = useAppSelector(selectRequestStatus);

  if (loading === 'pending') {
    return <div>Sign up...</div>;
  }

  if (loading === 'rejected') {
    navigate('/error');
  }

  if (loading === 'fulfilled') {
    navigate('/login');
  }

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
    dispatch(
      signupUser({ email: email, password: password, role: role as Role }),
    );
  };
  return (
    <div className="flex flex-grow justify-center">
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
          <div>
            <label
              htmlFor="role"
              className="text-sm md:text-lg text-gray-500 pb-1.5"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={e => setRole(e.target.value)}
              className="border border-gray-300 h-10 md:h-12 w-full rounded-sm focus:border-blue-600 block p-1 md:p-2.5 text-gray-700"
            >
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>
          <PrimaryButton onClick={handleSignUp} paddingy="3">
            Create account
          </PrimaryButton>
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

export default SignUp;
