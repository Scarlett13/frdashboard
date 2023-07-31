const baseURL = "http://192.168.10.31:8000/"

export function provideRequestOptions(path: string, method: string){
    const myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5MDc5NDE5NywianRpIjoiYjdjMzQ3ZWUtZDc5Mi00Yjc2LThiYjItNDc3ZmUwMDEzMjc2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IlZpc2kiLCJuYmYiOjE2OTA3OTQxOTcsImV4cCI6MTY5MDc5Nzc5N30.eVLfrsZeJfNLrNW5kl7I7E6_aYp8bC5I6OpPeI_dckI"
    );

    const request = new Request(`${baseURL}${path}`, {
    method: method,
    headers: myHeaders,
  });

    return request;
    
}