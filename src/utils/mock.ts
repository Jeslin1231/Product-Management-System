export const mockCustomerLoginApi = (email: string, password: string) => {
  const user = {
    id: '1',
    email: email,
    name: 'John Doe',
    role: 'customer',
  };
  const response = new Response(JSON.stringify(user));
  return Promise.resolve(response);
};

export const mockVendorLoginApi = (email: string, password: string) => {
  const user = {
    id: '2',
    email: email,
    name: 'Jane Doe',
    role: 'vendor',
  };
  const response = new Response(JSON.stringify(user));
  return Promise.resolve(response);
};
