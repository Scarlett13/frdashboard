import { Log } from "@/type/log";
import Navbar from "./navbar";
import SideBarLog from "./sidebarlog";

type LayoutLogProps = {
  children: React.ReactNode;
};

export default function LogLayout({ children }: LayoutLogProps) {
  return (
    <div className="h-screen">
      <Navbar>
        <main>{children}</main>
      </Navbar>
    </div>
  );
}
