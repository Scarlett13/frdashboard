import { Log } from "@/type/log";
import ModalLog from "./modallog";
import { useEffect, useState } from "react";
import { provideRequestOptions } from "@/libs/api";

function TableLogAccess() {
  const [logs, setLogs] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getLogs(
    url: string,
    method: string,
    params?: string,
    body?: string
  ) {
    const request = provideRequestOptions(url, method);

    try {
      fetch(request)
        .then((res) => res.json())
        .then((logs) => {
          setLogs(logs);
          setIsLoading(false);
          console.log(logs);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLogs("/access_log", "GET");
  }, []);
  return (
    <div className="grid grid-cols-1 gap-4 w-full justify-center">
      <h1 className="text-2xl font-bold py-4 ms-8">Log</h1>
      <div className="overflow-auto h-[45rem] mt-8">
        <table className="min-w-full border-collapse border-black border-2 text-center">
          <thead className="border-black border-2 sticky top-0 bg-gray-200 z-10">
            <tr>
              <th
                className={`py-2 px-4 bg-gray-200 ${
                  isLoading ? "animate-pulse bg-gray-300" : ""
                }`}
              >
                ID
              </th>
              <th
                className={`py-2 px-4 bg-gray-200 ${
                  isLoading ? "animate-pulse bg-gray-300" : ""
                }`}
              >
                Date
              </th>
              <th
                className={`py-2 px-4 bg-gray-200 ${
                  isLoading ? "animate-pulse bg-gray-300" : ""
                }`}
              >
                Message
              </th>
              <th
                className={`py-2 px-4 bg-gray-200 ${
                  isLoading ? "animate-pulse bg-gray-300" : ""
                }`}
              >
                Image
              </th>
              <th
                className={`py-2 px-4 bg-gray-200 ${
                  isLoading ? "animate-pulse bg-gray-300" : ""
                }`}
              >
                Id Device
              </th>
              <th
                className={`py-2 px-4 bg-gray-200 ${
                  isLoading ? "animate-pulse bg-gray-300" : ""
                }`}
              >
                Id Staff
              </th>
              <th
                className={`py-2 px-4 bg-gray-200 ${
                  isLoading ? "animate-pulse bg-gray-300" : ""
                }`}
              />
            </tr>
          </thead>
          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan={8} className="py-4 px-4">
                  <div className="animate-pulse bg-gray-300 h-5 w-full"></div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="border-black border-2">
              {logs?.map((log: Log) => (
                <tr key={log.id}>
                  <td className="py-2 px-4 border">{log.id}</td>
                  <td className="py-2 px-4 border">{log.LogTimeStamp}</td>
                  <td className="py-2 px-4 border">{log.LogMessage}</td>
                  <td className="py-2 px-4 border">{log.LogImage}</td>
                  <td className="py-2 px-4 border">{log.IdDevice}</td>
                  <td className="py-2 px-4 border">{log.IdStaff}</td>
                  <td className="py-2 px-4 border">
                    <ModalLog />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export { TableLogAccess };
