import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "./button";
import Input from "./input";
import { FormProvider, useForm } from "react-hook-form";
import { provideRequestOptions } from "@/libs/api";
import NewInput from "./new-forms-components/new-input";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

export default function ModalAddDevice() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const cancelButtonRef = useRef(null);

  //#region  //*=========== Form ===========
  const methods = useForm({
    mode: "onTouched",
  });
  const { handleSubmit } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit = async (data: any) => {
    const bodyData = {
      DeviceID: uuidv4(),
      DeviceName: data.device_name,
    };
    //provide request options for upload data
    const uploadFileRequest = provideRequestOptions({
      path: "/device",
      method: "post",
      body: JSON.stringify(bodyData),
    });

    //trycatch upload data
    try {
      const uploadDataResponse = await fetch(uploadFileRequest);

      if (uploadDataResponse.ok) {
        router.reload();
      }
    } catch (error) {
      console.log("error");
      console.log(error);
    }

    console.log({ bodyData });
    /** BUKA DISINI BUAT CLOSE MODAL */
    // closeModal();
    return;
  };
  //#endregion  //*======== Form Submit ===========

  return (
    <div>
      <Button
        buttonname="Add New Device"
        onClick={() => setOpen(true)}
        style=""
      />
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
                  <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 w-full">
                        <div className="sm:flex sm:items-start">
                          <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                            <Dialog.Title
                              as="h3"
                              className="text-base font-semibold leading-6 text-gray-900"
                            >
                              Add Device
                            </Dialog.Title>
                            <div className="mt-2 flex flex-row">
                              <div className="me-5 w-full">
                                <NewInput
                                  id="device_name"
                                  label="Device Name"
                                  validation={{
                                    required: "Device Name must be filled",
                                  }}
                                  placeholder="Enter device name"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                        >
                          Save
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
                    </form>
                  </FormProvider>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
