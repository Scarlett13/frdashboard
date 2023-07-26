import { Device } from "@/type/device";
import Navbar from "./navbar";
import SideBar from "./sidebar";
import { useEffect, useState } from "react";
import { provideGetRequest } from "@/libs/api";
import ModalEditDevice from "./modaleditdevice";

type layoutProps = {
  children: React.ReactNode;
  showSideBar: boolean;
};

// const listdevices: Device[] = [
//   {
//     DeviceId: "1",
//     DeviceName: "Device 1",
//     IsActive: true,
//     Roles: "Infra",
//     Users: "",
//     Id: 1,
//   },
//   {
//     DeviceId: "2",
//     DeviceName: "Device 2",
//     IsActive: true,
//     Roles: "Infra",
//     Users: "",
//     Id: 2,
//   },
// ];

export default function Layout({ children, showSideBar }: layoutProps) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const request = provideGetRequest("device");

  useEffect(() => {
    setLoading(true);
    try {
      fetch(request)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="h-screen">
      <Navbar>
        {showSideBar ? (
          <SideBar listdevices={data}>
            <div className="m-14">
              <ModalEditDevice />
            </div>
          </SideBar>
        ) : (
          <></>
        )}
        <main className={`mt-20 ${showSideBar ? "ms-72" : "ms-2"}`}>
          {children}
        </main>
      </Navbar>
    </div>
  );
}
