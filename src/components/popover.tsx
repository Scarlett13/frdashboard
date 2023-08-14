import { Popover, Transition } from "@headlessui/react";
import { BsThreeDots } from "react-icons/bs";
import { Fragment, useState } from "react";
import ButtonDelete from "./modaldelete";
import ModalEditDevice from "./modaleditdevice";
import { Menu } from "@headlessui/react";

export default function PopOver() {
  const [popoverOpen, setPopoverOpen] = useState(true);
  const [isOpen, setIsOpen] = useState();

  const handlePopoverClick = () => {
    setPopoverOpen(true);
  };
  return (
    <div className="relative inline-block">
      {/* <button className="" onClick={handlePopoverClick}>
        {popoverOpen ? <BsThreeDots /> : ""}
      </button>

      {isOpen && (
        <ModalEditDevice/>
      )} */}
    </div>

    // <div className="">
    //   <Popover className="relative">
    //     {({ open }) => (
    //       <>
    //         <Popover.Button
    //           className="mt-1"
    //           onClick={() => {
    //             console.log(open);
    //           }}
    //         >
    //           <BsThreeDots className={`${open}`} />
    //         </Popover.Button>
    //         <Transition
    //           as={Fragment}
    //           enter="transition ease-out duration-200"
    //           enterFrom="opacity-0 translate-y-1"
    //           enterTo="opacity-100 translate-y-0"
    //           leave="transition ease-in duration-150"
    //           leaveFrom="opacity-100 translate-y-0"
    //           leaveTo="opacity-0 translate-y-1"
    //         >
    //           <Popover.Panel className="absolute top-0 right-0 px-10 bg-neutral-400 opacity-100 flex flex-col items-start rounded-lg p-2 w-fit">
    //             <div className="-mt-6 pr-6">
    //               <ModalEditDevice />
    //               <ButtonDelete path={""} />
    //             </div>
    //           </Popover.Panel>
    //         </Transition>
    //       </>
    //     )}
    //   </Popover>
    // </div>

    // <Menu>
    //   <Menu.Button>More</Menu.Button>
    //   <Menu.Items>
    //     <Menu.Item>
    //       {({ active }) => (
    //         <a className={`${active && "bg-blue-500"}`} href="/modaleditdevice">
    //           Account settings
    //         </a>
    //       )}
    //     </Menu.Item>
    //     <Menu.Item>
    //       {({ active }) => (
    //         <a
    //           className={`${active && "bg-blue-500"}`}
    //           href="/modaldeletedevice"
    //         >
    //           Documentation
    //         </a>
    //       )}
    //     </Menu.Item>
    //     <Menu.Item disabled>
    //       <span className="opacity-75">Invite a friend (coming soon!)</span>
    //     </Menu.Item>
    //   </Menu.Items>
    // </Menu>
  );
}
