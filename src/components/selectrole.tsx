import { provideRequestOptions } from "@/libs/api";
import { Role } from "@/type/role";
import { useEffect, useState, useRef } from "react";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";

export default function SideBarRole() {
  const [isOpen, setIsOpen] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const sidebarRef = useRef<any>(null);

  async function getRoles(
    url: string,
    method: string,
    params?: string,
    body?: string
  ) {
    const request = provideRequestOptions(url, method);

    try {
      const response = await fetch(request);
      const rolesData = await response.json();
      setRoles(rolesData);
      console.log(rolesData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRoles("/role", "GET");
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    toggleSidebar();
  };

  return (
    <div>
      <button
        onClick={toggleSidebar}
        className="p-4 w-full flex items-center justify-between from-neutral-50 rounded tracking-wider border-transparent active:border-black duration-300 active:text-white"
      >
        {selectedRole ? selectedRole.RoleName : "Select Role"}
        {isOpen ? <AiFillCaretRight /> : <AiFillCaretLeft />}
      </button>

      {isOpen && (
        <div
          ref={sidebarRef}
          className="bg-neutral-400 absolute top-[140px] right-[140px] opacity-100 flex flex-col items-start rounded-lg p-2 w-fit"
        >
          {roles.map((role) => (
            <div
              key={role.id}
              className={`hover:bg-neutral-500 cursor-pointer rounded-r-lg rounded-l-lg ${
                selectedRole?.id === role.id ? "bg-neutral-500" : ""
              }`}
              onClick={() => handleRoleSelect(role)}
            >
              <h3>{role.RoleName}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
