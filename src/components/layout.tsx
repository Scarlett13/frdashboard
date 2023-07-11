import { Device } from "@/type/device";
import Navbar from "./navbar";
import SideBar from "./sidebar";
import { useEffect, useState } from "react";

type layoutProps = {
  children: React.ReactNode;
  route: string;
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

export default function Layout({ children, route }: layoutProps) {
  useEffect;

  return (
    <div className="h-screen">
      <Navbar />
      {route === "Device" ? (
        <SideBar listdevices={listdevices}></SideBar>
      ) : (
        <></>
      )}

      <main className={`mt-20 ${route === "Device" ? "ms-72" : "ms-20"}`}>
        {children}
      </main>
    </div>
  );
}
