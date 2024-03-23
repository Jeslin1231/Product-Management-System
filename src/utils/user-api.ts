import { post } from './network';

export const login = (email: string, password: string) => {
  return post('http://localhost:3000/auth/login', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password }),
  });
};
