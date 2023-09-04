import { Device } from "@/type/device";
import ButtonDelete from "./modaldelete";
import PopOverDevice from "./popoverdevice";
import { useEffect, useState } from "react";
import { provideRequestOptions } from "@/libs/api";

type DeviceProps = {
  listdevices?: Device[] | null;
  children: React.ReactNode;
};

export default function SideBar({ listdevices, children }: DeviceProps) {
  const [success, setSuccess] = useState<any>();
  const [listDevices, setListDivices] = useState<any>();

  async function getList(
    url: string,
    method: string,
    params?: string,
    body?: string
  ) {
    const request = provideRequestOptions(url, method);

    try {
      fetch(request)
        .then((res) => res.json())
        .then((listDevices) => {
          setListDivices(listDevices);
          setSuccess(false);
          console.log(listDevices);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getList("/device", "GET");
  }, []);

  useEffect(() => {
    if (success) {
      getList("/device", "GET");
    }
  }, [success]);

  return (
    <div className="bg-gray-800 fixed mt-20 text-white w-64 h-screen flex flex-col">
      <div className="p-4">
        <h2 className="text-xl font-bold">Device</h2>
      </div>
      <nav className="flex-grow">
        <ul className="p-4">
          {listDevices &&
            listDevices.map((device: any) => {
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
                      <PopOverDevice
                        popoverdevice={device}
                        setSuccess={setSuccess}
                      />
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
