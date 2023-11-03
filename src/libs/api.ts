import { buildPaginatedTableURL } from "./table";

const baseURL = "http://192.168.10.31:5000";
type RequestOptionsProps = {
  path: string;
  method?: string;
  body?: any;
  isUpload?: boolean;
  tableState?: any;
};

export async function provideRequestOptions({
  path,
  method,
  body,
  isUpload = false,
}: RequestOptionsProps) {
  const myHeaders = new Headers();
  const options: any = {};
  const token = await getTokenCookie();

  console.log("tokennya pak eko:", token);

  if (!token) {
    return null;
  }

  myHeaders.append("Authorization", `Bearer ${token}`);

  if (isUpload) {
    // myHeaders.append("Content-Type", "multipart/form-data");
  } else {
    myHeaders.append("Content-Type", "application/json");
  }

  options.redirect = "follow";
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

  myHeaders.append("Authorization", `Bearer ${token}`);

  options.method = "GET";
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
  myHeaders.append("Content-Type", "application/json");

  const options: any = {};

  options.redirect = "follow";
  options.method = "POST";
  options.headers = myHeaders;
  options.body = JSON.stringify(body);

  const request = new Request(`${baseURL}${"/auth/login"}`, options);

  return request;
}

export async function setTokenCookie(
  accessToken: string,
  refreshToken: string
) {
  return fetch("/api/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken, refreshToken }),
  });
}

export async function logout() {
  return fetch("/api/logout", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const getTokenCookie = async () => {
  const tokenresponse = await fetch("/api/access", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!tokenresponse.ok) {
    return null;
  }

  const tokenbody = await tokenresponse.json();
  if (!tokenbody.token || !tokenbody.success) {
    return null;
  }

  return tokenbody.token;
};
