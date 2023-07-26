import { Role } from "@/type/role";
import { useState } from "react";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";

export default function DropDownRole() {
  const [isOpen, setIsOpen] = useState(false);
  const roles: Role[] = [
    {
      RoleName: "Developer",
      Id: 1,
    },
    {
      RoleName: "Infra",
      Id: 2,
    },
    {
      RoleName: "Admin",
      Id: 3,
    },
    {
      RoleName: "Boss",
      Id: 4,
    },
  ];
  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-4 w-full flex items-center justify-between from-neutral-50 rounded tracking-wider border-transparent active:border-black duration-300 active:text-white"
      >
        Select Role
        {isOpen ? <AiFillCaretRight /> : <AiFillCaretLeft />}
      </button>

      {isOpen && (
        <div className="bg-neutral-400 absolute top-[140px] right-[140px] opacity-100 flex flex-col items-start rounded-lg p-2 w-fit">
          {roles.map((role) => (
            <div
              key={role.Id}
              className="hover:bg-neutral-500 cursor-pointer rounded-r-lg rounded-l-lg"
            >
              <h3>{role.RoleName}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
