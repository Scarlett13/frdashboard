import { Device } from "@/type/device";
import ButtonDelete from "./modaldelete";
import PopOverDevice from "./popoverdevice";
import { useState } from "react";

type DeviceProps = {
  listdevices?: Device[] | null;
  children: React.ReactNode;
};

export default function SideBar({ listdevices, children }: DeviceProps) {
  const [isSideBarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSideBar = () => {
    setIsSidebarOpen(!isSideBarOpen);
  };
  return (
    <div
      className="bg-gray-800 fixed mt-20 text-white w-64 h-screen flex flex-col"
      onClick={toggleSideBar}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold">Device</h2>
      </div>
      <button
        className="p-2 text-white hover:text-gray-300 focus:outline-none"
        onClick={(e) => {
          e.stopPropagation();
          toggleSideBar();
        }}
      >
        {isSideBarOpen ? "Collapse" : "Expand"}
      </button>
      <nav className="flex-grow">
        <ul className="p-4">
          {listdevices &&
            listdevices.map((device) => {
              return (
                <li className="py-2">
                  <div className="grid grid-cols-2 justify-between">
                    <a
                      href={`/device/${device.DeviceID}`}
                      className="flex text-white hover:underline items-center"
                    >
                      {device.DeviceName}
                    </a>
                    <div className="mx-16">
                      {/* <ButtonDelete path={`/device/${device.id}`} /> */}
                      <PopOverDevice deviceid={device.id.toString()} />
                    </div>
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
