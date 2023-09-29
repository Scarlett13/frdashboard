import { Device } from "@/type/device";
import { useEffect, useState } from "react";
import { provideRequestOptions } from "@/libs/api";
import clsxm from "@/libs/clsxm";
import { VscThreeBars } from "react-icons/vsc";
import Navbar from "../navigations/navbar";
import SideBar from "../navigations/sidebar";
import ModalAddDevice from "../modals/modal-add-device";

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
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    console.log(collapsed);
  }, [collapsed]);

  useEffect(() => {
    setLoading(true);
    async function getdata() {
      const request = await provideRequestOptions({
        path: "/device",
        method: "GET",
      });

      if (!request) {
        return;
      }

      try {
        fetch(request)
          .then((res) => res.json())
          .then((data) => {
            if (data.serialized_items) {
              setData(data.serialized_items);
            }

            setLoading(false);
            console.log(data);
          });
      } catch (error) {
        console.log(error);
      }
    }

    getdata();
  }, []);

  return (
    <div>
      <Navbar>{}</Navbar>
      {showSideBar ? (
        <>
          <div
            className={clsxm({
              "grid min-h-screen": true,
              "grid-cols-sidebar": !collapsed,
              "grid-cols-sidebar-collapsed": collapsed,
              "transition-[grid-template-columns] duration-300 ease-in-out":
                true,
            })}
          >
            <div className="bg-gray-800 text-white">
              <SideBar
                listdevices={data}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
              >
                <div className="m-14">
                  <ModalAddDevice />
                </div>
              </SideBar>
            </div>
            <main className={`mt-20 h-screen`}>{children}</main>
          </div>
        </>
      ) : (
        <main className={`mt-20 h-screen`}>{children}</main>
      )}
    </div>
  );
}
