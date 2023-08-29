import { Popover, Transition } from "@headlessui/react";
import { BsThreeDots } from "react-icons/bs";
import { Dispatch, Fragment, SetStateAction } from "react";
import ButtonDelete from "./modaldelete";
import Modal from "./modal";
import { Staff } from "@/type/staff";

interface popoverStaffProps {
  popoverStaff: Staff;
  setSuccess: Dispatch<SetStateAction<boolean>>;
}
export default function PopOverStaff({
  popoverStaff,
  setSuccess,
}: popoverStaffProps) {
  return (
    <div className="">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className="hover:bg-slate-200 active:bg-white focus:outline-none focus:ring focus:ring-black"
              onClick={() => {
                console.log(open);
              }}
            >
              <BsThreeDots className={`${open}`} />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute top-5 -right-5">
                <div className="w-full bg-slate-400">
                  <div className="gap-1 divide-y-2 divide-solid flex flex-col justify-center items-center rounded-lg p-2">
                    <Modal staff={popoverStaff} setSuccess={setSuccess} />
                    <ButtonDelete path={""} />
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
