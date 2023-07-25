import { Device } from "@/type/device";
import ButtonDelete from "./buttondelete";

type DeviceProps = {
  listdevices?: Device[] | null;
  children: React.ReactNode;
};

export default function SideBar({ listdevices, children }: DeviceProps) {
  return (
    <div className="bg-gray-800 fixed mt-20 text-white w-64 h-screen flex flex-col">
      <div className="p-4">
        <h2 className="text-xl font-bold">Device</h2>
      </div>
      <nav className="flex-grow">
        <ul className="p-4">
          {listdevices &&
            listdevices.map((device) => {
              return (
                <li className="py-2">
                  <div className="grid grid-cols-2 justify-between">
                    <a
                      href={`/device/${device.DeviceID}`}
                      className="block text-white hover:underline"
                    >
                      {device.DeviceName}
                    </a>
                    <ButtonDelete onClick={onclick} />
                  </div>
                </li>
              );
            })}
        </ul>

        {children}
      </nav>
    </div>
  );
}
