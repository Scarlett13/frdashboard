const baseURL = "http://192.168.10.31:5000"

export function provideRequestOptions(path: string, method: string, body?: any){
    const myHeaders = new Headers();
    const options:any = {};

    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5MzgwMDk1OSwianRpIjoiY2JmZWEzNTYtZmExNC00MDZjLTk1YzYtNjBmY2U3Y2JiNmI4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IlZpc2kiLCJuYmYiOjE2OTM4MDA5NTksImV4cCI6MTY5Mzk3Mzc1OX0.J5Q61qeNCj2UekmN7k2KiQjdUiKUgYXjGZDZ_8hUSXA"
    );

    myHeaders.append(
      "Content-Type",
      "application/json"

    )

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