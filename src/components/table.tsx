function TableLogAccess() {
  const data = [
    {
      id: 2,
      date: "2023-07-09",
      message: "Log entry 2",
      image: "test1",
      accuracyaccesslog: "string",
    },
    {
      id: 2,
      date: "2023-07-09",
      message: "Log entry 2",
      image: "test1",
      accuracyaccesslog: "string",
    },
    {
      id: 2,
      date: "2023-07-09",
      message: "Log entry 2",
      image: "test1",
      accuracyaccesslog: "string",
    },
  ];

  return (
    <div className="flex justify-center">
      <table className="min-w-full border-collapse border-black border-2">
        <thead className="border-black border-2">
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-left">ID</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Date</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Message</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Image</th>
            <th className="py-2 px-4 bg-gray-200 text-left">
              Accuracy Access Log
            </th>
          </tr>
        </thead>
        <tbody border-black border-2>
          {data.map((log) => (
            <tr key={log.id}>
              <td className="py-2 px-4 border">{log.id}</td>
              <td className="py-2 px-4 border">{log.date}</td>
              <td className="py-2 px-4 border">{log.message}</td>
              <td className="py-2 px-4 border">{log.image}</td>
              <td className="py-2 px-4 border">{log.accuracyaccesslog}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableLogError() {
  const data = [
    {
      idaccesslog: 1,
      iscorrect: true,
      isclear: true,
      accuracylogerror: "string",
    },
    {
      idaccesslog: 2,
      iscorrect: true,
      isclear: true,
      accuracylogerror: "string",
    },
    {
      idaccesslog: 3,
      iscorrect: true,
      isclear: true,
      accuracylogerror: "string",
    },
  ];

  return (
    <div className="flex justify-center">
      <table className="min-w-full border-collapse border-black border-2">
        <thead className="border-black border-2">
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-left">ID Access Log</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Is Correct</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Is Clear</th>
            <th className="py-2 px-4 bg-gray-200 text-left">
              Accuracy Log Error
            </th>
          </tr>
        </thead>
        <tbody border-black border-2>
          {data.map((log) => (
            <tr key={log.id}>
              <td className="py-2 px-4 border">{log.idaccesslog}</td>
              <td className="py-2 px-4 border">{String(log.iscorrect)}</td>
              <td className="py-2 px-4 border">{String(log.isclear)}</td>
              <td className="py-2 px-4 border">{log.accuracylogerror}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { TableLogAccess, TableLogError };
