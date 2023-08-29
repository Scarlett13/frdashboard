import { Popover, Transition } from "@headlessui/react";
import { BsThreeDots } from "react-icons/bs";
import { Fragment, useState } from "react";
import ButtonDelete from "./modaldelete";
import ModalEditDevice from "./modaleditdevice";
import { Device } from "@/type/device";

export default function PopOverDevice() {
  return (
    <div className="">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className="mt-1active:bg-white focus:outline-none focus:ring focus:ring-white"
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
              <Popover.Panel className="absolute top-0 left-5">
                <div className="w-full bg-white">
                  <div className="gap-1 divide-y-2 divide-solid flex flex-col justify-center items-center rounded-lg p-2">
                    <ModalEditDevice />
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
