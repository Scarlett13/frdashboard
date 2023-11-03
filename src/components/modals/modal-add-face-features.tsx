import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { provideRequestOptions } from "@/libs/api";
import { useRouter } from "next/router";
import { LiaTrashAltSolid } from "react-icons/lia";

type ButtonDeleteProps = {
  children?: React.ReactNode;
  path: string;
  imagepath: string;
  staffname: string;
};

export default function ButtonAddFaceFeatures({
  children,
  path,
  imagepath,
  staffname,
}: ButtonDeleteProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const cancelButtonRef = useRef(null);

  async function AddFaceFeatures() {
    const body = JSON.stringify({
      StaffFace: imagepath,
    });

    const request = await provideRequestOptions({ path, method: "POST", body });

    if (!request) {
      return;
    }

    try {
      fetch(request)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Fetch error: ${res.status} - ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          // Handle the successful response here
          // You can set the state or perform other actions with the data
          router.push("/staff");
        })
        .catch((error) => {
          // Handle the error here
          console.error(error);
        });
    } catch (error) {
      // Handle any synchronous errors that occur before the fetch
      console.error(error);
    }
  }
  return (
    <div className="w-full flex justify-between items-center">
      <div
        className="inline-flex justify-between gap-4 cursor-pointer px-2 hover:text-red-600 hover:bg-slate-700 hover:underline mt-2 bg-slate-300 p-2 rounded-md"
        onClick={() => setOpen(true)}
      >
        <p>Register This Face</p>
        {/* <LiaTrashAltSolid /> */}
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900 items-center"
                        >
                          Tambah face features ini untuk {staffname}?
                        </Dialog.Title>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        setOpen(false);
                        AddFaceFeatures();
                      }}
                    >
                      Register
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {children}
    </div>
  );
}
