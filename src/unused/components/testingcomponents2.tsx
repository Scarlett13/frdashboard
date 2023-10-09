import clsxm from "@/libs/clsxm";
import { useState } from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

type Props = {
  collapsed: boolean;
  setCollapsed(collapsed: boolean): void;
};
export default function testingSidebar({ collapsed, setCollapsed }: Props) {
  //   const [collapsed, setCollapsed] = useState(false);
  const Icon = collapsed ? BsChevronDoubleRight : BsChevronDoubleLeft;

  return (
    <div
      className={clsxm({
        "bg-indigo-700 text-zinc-50 z-20": true,
      })}
    >
      <div
        className={clsxm({
          "flex flex-col justify-between": true,
        })}
      >
        <div
          className={clsxm({
            "flex items-center border-b border-b-indigo-800": true,
            "p-4 justify-between": !collapsed,
            "py-4 justify-center": collapsed,
          })}
        >
          {!collapsed && <span className="whitespace-nowrap" />}
          <button
            className={clsxm({
              "grid place-content-center": true,
              "hover:bg-indigo-800 ": true,
              "w-10 h-10 rounded-full": true,
            })}
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
