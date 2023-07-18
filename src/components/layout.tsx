import { Device } from "@/type/device";
import Navbar from "./navbar";
import SideBar from "./sidebar";
import { useEffect, useState } from "react";
import SideBarLog from "./sidebarlog";

type layoutProps = {
  children: React.ReactNode;
  showSideBar: boolean;
};

const listdevices: Device[] = [
  {
    DeviceId: "1",
    DeviceName: "Device 1",
    IsActive: true,
    Roles: "Infra",
    Users: "",
    Id: 1,
  },
  {
    DeviceId: "2",
    DeviceName: "Device 2",
    IsActive: true,
    Roles: "Infra",
    Users: "",
    Id: 2,
  },
];

export default function Layout({ children, showSideBar }: layoutProps) {
  return (
    <div className="h-screen">
      <Navbar>
        {showSideBar ? <SideBar listdevices={listdevices}></SideBar> : <></>}
        <main className={`mt-20 ${showSideBar ? "ms-72" : "ms-2"}`}>
          {children}
        </main>
      </Navbar>
    </div>
  );
}
