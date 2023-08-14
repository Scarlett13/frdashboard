const baseURL = "http://192.168.10.31:5000"

export function provideRequestOptions(path: string, method: string, body?: any){
    const myHeaders = new Headers();
    const options:any = {};

    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5MTk4MTMzNiwianRpIjoiNzg5NWM5NWYtODYyYS00MWI1LWI0ZmMtODk5YjEyZTRhYmI4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IlZpc2kiLCJuYmYiOjE2OTE5ODEzMzYsImV4cCI6MTY5MjE1NDEzNn0.uwQGJaiBqxEs7SKhzHrGYQsKchyhG0RX1rX2Vrp2vu0"
    );

    options.method = method;
    options.headers = myHeaders;
    
    if(body){
      options.body = body;
    }

    // const Test = "yudha"
    // const tests = "visi"
    // const plus1 = Test+ "/" +tests
    // const plus2 = `Test/${tests}`

    const request = new Request(`${baseURL}${path}`, options);

    return request;
    
}