import { buildPaginatedTableURL } from "./table";

const baseURL = "http://192.168.10.31:5000";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5NDE2Mzg4NCwianRpIjoiMjE3NGRiMGQtYTQ1NS00OTIxLWI0OTctZWZhN2ZkOWI1ZmU2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IlZpc2kiLCJuYmYiOjE2OTQxNjM4ODQsImV4cCI6MTY5NDMzNjY4NH0.aFTjoFbzBDH3BWGWfdwW92OlQzdSPUTZ3mJ8H1E3Vro";

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
