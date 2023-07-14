import { Log } from "@/type/log";

type LogProps = {
  listlog: Log[];
};

export default function SideBarLog({ listlog }: LogProps) {
  return (
    <div className="bg-gray-800 fixed mt-20 text-white w-64 h-screen flex flex-col">
      <div className="p-4">
        <h2 className="text-xl font-bold">Log</h2>
      </div>
      <nav className="flex-grow">
        <ul className="p-4">
          {listlog.map((log) => {
            return (
              <li className="py-2">
                <a
                  href={`/log/${log.path}`}
                  className="block text-white hover:underline"
                >
                  {log.logname}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
