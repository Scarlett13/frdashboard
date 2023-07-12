import { Device } from "@/type/device";
import Navbar from "./navbar";
import SideBar from "./sidebar";
import { useEffect, useState } from "react";

type layoutProps = {
  children: React.ReactNode;
  showSideBar: boolean;
};

const listdevices: Device[] = [
  {
    deviceid: 1,
    devicename: "Device 1",
  },
  {
    deviceid: 2,
    devicename: "Device 2",
  },
];

export default function Layout({ children, showSideBar }: layoutProps) {
  return (
    <div className="h-screen">
      <Navbar />
      {showSideBar ? <SideBar listdevices={listdevices}></SideBar> : <></>}

      <main className={`mt-20 ${showSideBar ? "ms-72" : "ms-2"}`}>
        {children}
      </main>
    </div>
  );
}
