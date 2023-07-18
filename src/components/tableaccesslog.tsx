import { Log } from "@/type/log";
import Button from "./button";
import ModalLog from "./modallog";

function TableLogAccess() {
  const data: Log[] = [
    {
      AccessLog: "",
      IdDevice: 1,
      IdStaff: 2,
      LogImage: "",
      LogMessage: "",
      LogTimeStamp: "",
      Id: 1,
    },
    {
      AccessLog: "",
      IdDevice: 1,
      IdStaff: 2,
      LogImage: "",
      LogMessage: "",
      LogTimeStamp: "",
      Id: 2,
    },
    {
      AccessLog: "",
      IdDevice: 1,
      IdStaff: 2,
      LogImage: "",
      LogMessage: "",
      LogTimeStamp: "",
      Id: 3,
    },
  ];

  return (
    <div className="flex justify-center">
      <table className="min-w-full border-collapse border-black border-2 text-center">
        <thead className="border-black border-2">
          <tr>
            <th className="py-2 px-4 bg-gray-200">ID</th>
            <th className="py-2 px-4 bg-gray-200">Date</th>
            <th className="py-2 px-4 bg-gray-200">Message</th>
            <th className="py-2 px-4 bg-gray-200">Image</th>
            <th className="py-2 px-4 bg-gray-200">Access Log</th>
            <th className="py-2 px-4 bg-gray-200">Id Device</th>
            <th className="py-2 px-4 bg-gray-200">Id Staff</th>
            <th className="py-2 px-4 bg-gray-200" />
          </tr>
        </thead>
        <tbody border-black border-2>
          {data.map((log) => (
            <tr key={log.Id}>
              <td className="py-2 px-4 border">{log.Id}</td>
              <td className="py-2 px-4 border">{log.LogTimeStamp}</td>
              <td className="py-2 px-4 border">{log.LogMessage}</td>
              <td className="py-2 px-4 border">{log.LogImage}</td>
              <td className="py-2 px-4 border">{log.AccessLog}</td>
              <td className="py-2 px-4 border">{log.IdDevice}</td>
              <td className="py-2 px-4 border">{log.IdStaff}</td>

              <td className="py-2 px-4 border">
                <ModalLog />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { TableLogAccess };
