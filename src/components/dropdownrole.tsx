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
        className="bg-sky-400 p-4 w-full flex items-center justify-between font-semibold rounded tracking-wider border-transparent active:border-black duration-300 active:text-white"
      >
        Select Role
        {isOpen ? <AiFillCaretRight /> : <AiFillCaretLeft />}
      </button>

      {isOpen && (
        <div className="bg-sky-400 absolute top-[140px] right-[140px] opacity-100 flex flex-col items-start rounded-lg p-2 w-fit">
          {roles.map((role) => (
            <div key={role.Id}>
              <h3>{role.RoleName}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
