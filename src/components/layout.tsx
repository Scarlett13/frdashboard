import { Device } from "@/type/device";
import Navbar from "./navbar";
import SideBar from "./sidebar";
import { useEffect, useState } from "react";
import { provideRequestOptions } from "@/libs/api";
import ModalAddDevice from "./modaladddevice";
import clsxm from "@/libs/clsxm";
import { VscThreeBars } from "react-icons/vsc";

type layoutProps = {
  children?: React.ReactNode;
  showSideBar?: boolean | null;
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

  const request = provideRequestOptions({ path: "/device", method: "GET" });

  useEffect(() => {
    setLoading(true);
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
  }, []);
  return (
    <Navbar>
      <div
        className={clsxm({
          "grid min-h-screen": true,
          "grid-cols-sidebar": !collapsed,
          "grid-cols-sidebar-collapsed": collapsed,
          "transition-[grid-template-columns] duration-300 ease-in-out": true,
        })}
      >
        {showSideBar ? (
          <div className="bg-gray-800 text-white">
            <div>
              <button
                className="me-4"
                onClick={() => setCollapsed((prev) => !prev)}
              >
                <div className="relative">
                  <VscThreeBars className="inset-0 w-8 h-8 mt-24 hover:scale-110 ml-4" />
                </div>
              </button>
              {!collapsed && (
                <div>
                  <SideBar listdevices={data}>
                    {/* <div className="m-14">
                      <ModalAddDevice />
                    </div> */}
                  </SideBar>
                </div>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
        {/* <div className="h-screen w-full">
          <main className={`mt-20${showSideBar ? "m-72" : "m-72"}`}>
            {children}
          </main>
        </div> */}
        <main>{children}</main>
      </div>
    </Navbar>
  );
}
