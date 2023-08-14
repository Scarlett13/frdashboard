import logo from "@Images/logo.png";
import Image from "next/image";

type NavBarProps = {
  children: React.ReactNode;
};

export default function Navbar({ children }: NavBarProps) {
  return (
    <div className="flex flex-col">
      {children}
      <div className="flex justify-between fixed w-full h-20 shadow-xl bg-white items-center">
        <div className="text-center">
          <Image alt="alt text." src={logo} className="ms-2 w-1/3" />
        </div>
        <div className="grid gap-2 grid-cols-4 items-center h-full px-4 text-center">
          <a href="/device" className="hover:underline">
            Device
          </a>
          <a href="/staff" className="hover:underline">
            Staff
          </a>
          <a href="/log" className="hover:underline">
            Log
          </a>
          <a href="/" className="hover:underline">
            Log Out
          </a>
        </div>
      </div>
    </div>
  );
}
