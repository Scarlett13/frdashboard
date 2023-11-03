import { Device } from "@/type/device";
import { useEffect, useState } from "react";
import { VscThreeBars } from "react-icons/vsc";
import clsxm from "@/libs/clsxm";
import PopOverDevice from "@/components/popover/popover-device";

type DeviceProps = {
  listdevices?: Device[] | null;
  children: React.ReactNode;
};

export default function TestingLayout({ listdevices, children }: DeviceProps) {
  const [collapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    console.log(collapsed);
  }, [collapsed]);

  return (
    <div
      className={clsxm({
        "grid min-h-screen": true,
        "grid-cols-sidebar": !collapsed,
        "grid-cols-sidebar-collapsed": collapsed,
        "transition-[grid-template-columns] duration-300 ease-in-out": true,
      })}
    >
      <div className="bg-indigo-700 text-white h-screen">
        <button onClick={() => setSidebarCollapsed((prev) => !prev)}>
          <VscThreeBars className="w-10 h-10" />
        </button>
        <nav className="flex-grow">
          <ul className="p-4">
            {listdevices &&
              listdevices.map((device) => {
                return (
                  <li className="py-2" key={device.id}>
                    {!collapsed && (
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
                    )}
                  </li>
                );
              })}
          </ul>

          {children}
        </nav>
      </div>
      {children}
    </div>
  );
}
