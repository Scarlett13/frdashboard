import { Device } from "@/type/device";
import PopOverDevice from "./popoverdevice";
import { useEffect, useState } from "react";
import { VscThreeBars } from "react-icons/vsc";

type DeviceProps = {
  listdevices?: Device[] | null;
  children: React.ReactNode;
};

export default function SideBar({ listdevices, children }: DeviceProps) {
  console.log(listdevices);
  return (
    <div className="fixed mt-2 text-white h-screen flex flex-col">
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
    </div>
  );
}
