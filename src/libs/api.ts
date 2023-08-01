const baseURL = "http://192.168.10.31:8000"

export function provideRequestOptions(path: string, method: string){
    const myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5MDg4MjA0OSwianRpIjoiZTgwMTM4YmMtYWEyNi00ODUwLThhNTAtYTU1N2U3ZWQxNzY2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IlZpc2kiLCJuYmYiOjE2OTA4ODIwNDksImV4cCI6MTY5MDg4NTY0OX0.HyZJWV8yx7Kg4caJ8RL2IhtLHIdHSMYCutA4DP6I8zg"
    );

    const request = new Request(`${baseURL}${path}`, {
    method: method,
    headers: myHeaders,
  });

    return request;
    
}