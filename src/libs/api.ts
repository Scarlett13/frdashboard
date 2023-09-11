import { buildPaginatedTableURL } from "./table";

const baseURL = "http://192.168.10.31:5000";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5NDQwMDQyNCwianRpIjoiMWJiZWUwN2YtNjA1Ni00MWViLWIzYjItOTUyZGQ0MmMzNjljIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IlZpc2kiLCJuYmYiOjE2OTQ0MDA0MjQsImV4cCI6MTY5NDU3MzIyNH0.W9sCxtBV8dmbuPyh15DFCb3-Gr4BdFFXrSDpUrf24D4";

type RequestOptionsProps = {
  path: string;
  method?: string;
  body?: any;
  isUpload?: boolean;
  tableState?: any;
};

export function provideRequestOptions({
  path,
  method,
  body,
  isUpload = false,
}: RequestOptionsProps) {
  const myHeaders = new Headers();
  const options: any = {};

  myHeaders.append("Authorization", token);

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

  console.log(options);

  // const Test = "yudha"
  // const tests = "visi"
  // const plus1 = Test+ "/" +tests
  // const plus2 = `Test/${tests}`

  const request = new Request(`${baseURL}${path}`, options);

  return request;
}

export function providePaginatedOptions({
  path,
  tableState,
}: RequestOptionsProps) {
  if (!tableState) {
    return;
  }
  const myHeaders = new Headers();
  const options: any = {};

  myHeaders.append("Authorization", token);

  options.method = "GET";
  options.headers = myHeaders;

  const paginated_url = buildPaginatedTableURL({
    baseUrl: `${baseURL}${path}`,
    tableState,
  });

  const request = new Request(paginated_url, options);

  return request;
}
