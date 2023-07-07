import logo from "@Images/logo.png";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between fixed w-full h-20 shadow-xl bg-white items-center">
        <div className="text-center">
          <Image alt="alt text." src={logo} className="ms-2 w-2/3" />
        </div>
        <div className="grid gap-2 grid-cols-4 items-center h-full px-4 text-center">
          <a href="/home">Home</a>
          <a href="/device" className="">
            Device
          </a>
          <a href="/staff" className="">
            Staff
          </a>
          <a href="/Log" className="">
            Log
          </a>
        </div>
      </div>
    </div>
  );
}
