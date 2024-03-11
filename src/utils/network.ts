export const get = (
  url: string,
  options: RequestInit = {},
): Promise<Response> => {
  const request = new Request(url, {
    ...options,
    method: 'GET',
  });
  return fetch(request);
};

export const post = (
  url: string,
  options: RequestInit = {},
): Promise<Response> => {
  const request = new Request(url, {
    ...options,
    method: 'POST',
  });
  return fetch(request);
};

export const put = (
  url: string,
  options: RequestInit = {},
): Promise<Response> => {
  const request = new Request(url, {
    ...options,
    method: 'PUT',
  });
  return fetch(request);
};

export const del = (
  url: string,
  options: RequestInit = {},
): Promise<Response> => {
  const request = new Request(url, {
    ...options,
    method: 'DELETE',
  });
  return fetch(request);
};
