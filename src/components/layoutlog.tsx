import { Log } from "@/type/log";
import Navbar from "./navbar";
import SideBarLog from "./sidebarlog";

type LayoutLogProps = {
  children: React.ReactNode;
  ShowSideBarLog: boolean;
};

const listlog: Log[] = [
  { logid: 1, logname: "Log Accuracy Access", path: "accuracy-access" },
  { logid: 2, logname: "Log Accuracy Error", path: "accuracy-error" },
];

export default function LogLayout({
  ShowSideBarLog,
  children,
}: LayoutLogProps) {
  return (
    <div className="h-screen">
      <Navbar>
        {ShowSideBarLog ? <SideBarLog listlog={listlog}></SideBarLog> : <></>}
        <main className={`mt-20 ${ShowSideBarLog ? "ms-72" : "ms-2"}`}>
          {children}
        </main>
      </Navbar>
    </div>
  );
}
