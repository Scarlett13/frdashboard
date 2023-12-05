import { Device } from "@/type/device";
import PopOverDevice from "../popover/popover-device";
import { useEffect, useState } from "react";
import { VscThreeBars } from "react-icons/vsc";

type DeviceProps = {
  listdevices?: Device[] | null;
  children: React.ReactNode;
  collapsed: boolean;
  setCollapsed: any;
};

export default function SideBar({
  listdevices,
  children,
  collapsed,
  setCollapsed,
}: DeviceProps) {
  // const [collapsed, setSidebarCollapsed] = useState(false);
  console.log(listdevices);
  useEffect(() => {
    console.log(collapsed);
  }, [collapsed]);
  return (
    <div className="fixed mt-20 text-white h-screen flex flex-col">
      <button
        className="ms-4 w-0"
        onClick={() => setCollapsed((prev: boolean) => !prev)}
      >
        <VscThreeBars className="w-8 h-8 mt-10 hover:scale-110" />
      </button>
      {!collapsed && (
        <>
          <div className="p-4">
            <h2 className="text-xl font-bold">Device</h2>
          </div>
          <nav className="flex-grow">
            <ul className="p-4">
              {listdevices &&
                listdevices.map((device) => {
                  console.log(device);
                  return (
                    <li className="py-2" key={device.id}>
                      <div className="grid grid-cols-2 justify-between">
                        <a
                          href={`/device/${device.DeviceID}`}
                          className="flex text-white hover:underline items-center"
                        >
                          {device.DeviceName || "Unknown"}
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
        </>
      )}
    </div>
  );
}
