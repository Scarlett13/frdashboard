const baseURL = "http://192.168.10.31:8000/"

export function provideGetRequest(path: string){
    const myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5MDI3Njg0NSwianRpIjoiZjk0YmMxNGQtYzdiOS00MDM1LWE1ZGUtNjZjNDU4YmQ5NWE4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IlZpc2kiLCJuYmYiOjE2OTAyNzY4NDUsImV4cCI6MTY5MDI4MDQ0NX0.y3xCbhLlVde_iP6RxqNgiyvGSuCXg4BpICcsFSWlXh4"
    );

    const request = new Request(`${baseURL}${path}`, {
    method: "GET",
    headers: myHeaders,
  });

    return request;
    
}