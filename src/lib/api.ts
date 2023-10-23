/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from './logger';
import { buildPaginatedTableURL } from './table';

const baseURL = 'http://192.168.10.31:5000';

type RequestOptionsProps = {
  path: string;
  method?: string;
  token?: string;
  body?: any;
  isUpload?: boolean;
  tableState?: any;
};

export function provideServerRequestOptions({
  path,
  method,
  body,
  isUpload = false,
  token,
}: RequestOptionsProps) {
  const myHeaders = new Headers();
  const options: any = {};

  myHeaders.append('Authorization', `Bearer ${token}`);
  if (isUpload) {
    //ini harus ditutup buat upload, belum tau kenapa
    // myHeaders.append('Content-Type', 'multipart/form-data');
  } else {
    myHeaders.append('Content-Type', 'application/json');
  }

  options.redirect = 'follow';
  options.method = method;
  options.headers = myHeaders;

  if (body) {
    options.body = body;
  }

  const request = new Request(`${baseURL}${path}`, options);

  return request;
}

export async function provideRequestOptions({
  path,
  method,
  body,
  isUpload = false,
}: RequestOptionsProps) {
  const myHeaders = new Headers();
  const options: any = {};
  const token = await getTokenCookie();

  // console.log("tokennya pak eko:", token);

  if (!token) {
    return null;
  }

  myHeaders.append('Authorization', `Bearer ${token}`);

  if (isUpload) {
    //ini harus ditutup buat upload, belum tau kenapa
    // myHeaders.append('Content-Type', 'multipart/form-data');
  } else {
    myHeaders.append('Content-Type', 'application/json');
  }

  options.redirect = 'follow';
  options.method = method;
  options.headers = myHeaders;

  if (body) {
    options.body = body;
  }

  const request = new Request(`${baseURL}${path}`, options);

  return request;
}

export async function providePaginatedOptions({
  path,
  tableState,
}: RequestOptionsProps) {
  if (!tableState) {
    return;
  }
  const myHeaders = new Headers();
  const options: any = {};

  const token = await getTokenCookie();

  if (!token) {
    return null;
  }

  myHeaders.append('Authorization', `Bearer ${token}`);

  options.method = 'GET';
  options.headers = myHeaders;

  const paginated_url = buildPaginatedTableURL({
    baseUrl: `${baseURL}${path}`,
    tableState,
  });

  const request = new Request(paginated_url, options);

  return request;
}

export function provideLoginRequest(body: any) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const options: any = {};

  options.redirect = 'follow';
  options.method = 'POST';
  options.headers = myHeaders;
  options.body = JSON.stringify(body);

  const request = new Request(`${baseURL}${'/auth/login'}`, options);

  return request;
}

export async function setTokenCookie(
  accessToken: string,
  refreshToken: string
) {
  return fetch('/api/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ accessToken, refreshToken }),
  });
}

export async function logout() {
  return fetch('/api/logout', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const getTokenCookie = async () => {
  const tokenresponse = await fetch('/api/access', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!tokenresponse.ok) {
    const gg = await tokenresponse.json();
    logger(gg);
    return null;
  }

  const tokenbody = await tokenresponse.json();
  if (!tokenbody.token || !tokenbody.success) {
    return null;
  }

  return tokenbody.token;
};
