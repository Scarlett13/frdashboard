const baseURL = "http://192.168.10.31:8000/"

export function provideGetRequest(path: string){
    const myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5MDM2MjU0OCwianRpIjoiYjI3MmYzMGUtMjNhZS00NjYwLWFlYTktOGY3MjQ1NzhmN2VkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IlZpc2kiLCJuYmYiOjE2OTAzNjI1NDgsImV4cCI6MTY5MDM2NjE0OH0.wCU1I30BuWG1HBlAhfcSqRcYlAD5wbYV0seiIluIPak"
    );

    const request = new Request(`${baseURL}${path}`, {
    method: "GET",
    headers: myHeaders,
  });

    return request;
    
}