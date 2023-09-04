import Button from "@/components/button";
import Card from "@/components/card";
import { provideRequestOptions } from "@/libs/api";
import { Log } from "@/type/log";
import { useState } from "react";

export default function testingLogApi() {
  const [listLog, setListLog] = useState<any>();

  async function Log(
    url: string,
    method: string,
    params?: string,
    body?: string
  ) {
    const request = provideRequestOptions({ path: url, method });

    try {
      fetch(request)
        .then((res) => res.json())
        .then((logApi) => {
          setListLog(logApi);
          console.log(logApi);
        });
    } catch (error) {
      setListLog(error);
      console.log(error);
    }
  }
  return (
    <div className="h-screen">
      <div>
        <Button buttonname={"GET"} onClick={() => Log("/access_log", "GET")} />
      </div>
      <div>
        {listLog &&
          listLog.map((isiLog: Log, index: number) => (
            <Card key={isiLog.Id}>
              <div>
                <div>
                  <p>Index</p>
                  <p>Id</p>
                  <p>Id Device</p>
                  <p>Log Image</p>
                  <p>Log Message</p>
                </div>
                <div>
                  <p>: {index}</p>
                  <p>: {isiLog.Id}</p>
                  <p>: {isiLog.IdDevice}</p>
                  <p>: {isiLog.LogImage}</p>
                  <p>: {isiLog.LogMessage}</p>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}
