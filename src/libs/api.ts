const baseURL = "http://192.168.10.31:5000";

type RequestOptionsProps = {
  path: string;
  method: string;
  body?: any;
  isUpload?: boolean;
};

export function provideRequestOptions({
  path,
  method,
  body,
  isUpload = false,
}: RequestOptionsProps) {
  const myHeaders = new Headers();
  const options: any = {};

  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5MzE4OTk0MywianRpIjoiZjA0ZmZiNTctODMwYS00ZDAzLWFlNjItZDgyYTFhOTk2YmRkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IlZpc2kiLCJuYmYiOjE2OTMxODk5NDMsImV4cCI6MTY5MzM2Mjc0M30.lJVfguO1d7Lfz5_-7dBQqQMkHFMycFURwNWu1VNy3J8"
  );

  if (isUpload) {
    myHeaders.append("Content-Type", "multipart/form-data");
  } else {
    myHeaders.append("Content-Type", "application/json");
  }

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
