import { logout } from "@/libs/api";
import logo from "@Images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

type NavBarProps = {
  children?: React.ReactNode;
};

export default function Navbar({ children }: NavBarProps) {
  const router = useRouter();
  async function buttonLogout() {
    await logout();
    router.reload();
  }
  return (
    <div className="flex flex-col">
      {children}
      <div className="flex justify-between fixed w-full h-20 shadow-xl bg-white items-center">
        <Link href="/device" className="text-center">
          <Image alt="alt text." src={logo} className="ms-2 w-1/3" />
        </Link>
        <div className="grid gap-2 grid-cols-4 items-center h-full px-4 text-center">
          <Link href="/device" className="hover:underline">
            Device
          </Link>
          <Link href="/staff" className="hover:underline">
            Staff
          </Link>
          <Link href="/log" className="hover:underline">
            Log
          </Link>
          <button onClick={buttonLogout} className="hover:underline">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
