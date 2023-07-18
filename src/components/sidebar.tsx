import { Device } from "@/type/device";

type DeviceProps = {
  listdevices: Device[];
};

export default function SideBar({ listdevices }: DeviceProps) {
  return (
    <div className="bg-gray-800 fixed mt-20 text-white w-64 h-screen flex flex-col">
      <div className="p-4">
        <h2 className="text-xl font-bold">Device</h2>
      </div>
      <nav className="flex-grow">
        <ul className="p-4">
          {listdevices.map((device) => {
            return (
              <li className="py-2">
                <a
                  href={`/device/${device.DeviceId}`}
                  className="block text-white hover:underline"
                >
                  {device.DeviceName}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
