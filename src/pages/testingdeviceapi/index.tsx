import Button from "@/components/button";
import Card from "@/components/card";
import { provideRequestOptions } from "@/libs/api";
import { useState } from "react";
import { Device } from "@/type/device";

export default function testingDeviceApi() {
  const [listDevice, setListDevice] = useState<any>();

  async function Device(
    url: string,
    method: string,
    params?: string,
    body?: string
  ) {
    const request = provideRequestOptions({ path: url, method });

    try {
      fetch(request)
        .then((res) => res.json())
        .then((deviceApi) => {
          setListDevice(deviceApi);
          console.log(deviceApi);
        });
    } catch (error) {
      console.log(error);
      setListDevice(error);
    }
  }
  return (
    <div className="h-screen">
      <div className="flex justify-between w-full h-20 shadow-xl bg-white items-center">
        <Button buttonname={"GET"} onClick={() => Device("/device", "GET")} />
        <Button buttonname={"LIST"} onClick={() => Device("/device", "GET")} />
      </div>
      <div>
        {listDevice &&
          listDevice.map((deviceSatuan: Device, index: number) => (
            <Card key={deviceSatuan.id}>
              <div className="flex flex-row mt-4 px-6">
                <div>
                  <p>Index</p>
                  <p>Device Id</p>
                  <p>Device Name</p>
                </div>
                <div>
                  <p>{index}</p>
                  <p>: {deviceSatuan.DeviceID}</p>
                  <p>: {deviceSatuan.DeviceName}</p>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}
