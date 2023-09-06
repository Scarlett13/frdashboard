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
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5Mzk3MjI0NiwianRpIjoiYTVkNWRiYjYtZmE4OC00YjU4LTg2YjgtY2U3N2ExOTI4NTM3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IlZpc2kiLCJuYmYiOjE2OTM5NzIyNDYsImV4cCI6MTY5NDE0NTA0Nn0.MVWrSsehDUioaALtN4H-XooSUg1ttctdYcv7KR78bL4"
  );

  if (isUpload) {
    // myHeaders.append("Content-Type", "multipart/form-data");
  } else {
    myHeaders.append("Content-Type", "application/json");
  }

  options.redirect = 'follow'
  options.method = method;
  options.headers = myHeaders;

  if (body) {
    options.body = body;
  }

  console.log(options)

  // const Test = "yudha"
  // const tests = "visi"
  // const plus1 = Test+ "/" +tests
  // const plus2 = `Test/${tests}`

  const request = new Request(`${baseURL}${path}`, options);

  return request;
}
