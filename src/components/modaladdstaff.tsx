import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "./button";
import Input from "./input";
import Toggle from "./toggleswitch";
import SideBarRole from "./selectrole";
import { PiUserPlusBold } from "react-icons/pi";
import UploadImage from "./uploadimage";
import { FormProvider, useForm } from "react-hook-form";
import NewInput from "./new-forms-components/new-input";
import DropzoneInput from "./new-forms-components/dropzoneinput";
import SelectInput from "./new-forms-components/select-input";
import Image from "next/image";
import { provideRequestOptions } from "@/libs/api";
import { Role } from "@/type/role";

const defaultRole = [
  {
    id: 1,
    RoleName: "Staff",
  },
  {
    id: 2,
    RoleName: "Admin",
  },
  {
    id: 3,
    RoleName: "Developer",
  },
];

export default function ModalAddStaff() {
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    async function getRoles(url: string, method: string) {
      const request = provideRequestOptions(url, method);

      try {
        const response = await fetch(request);
        const rolesData = await response.json();
        setRoles(rolesData);
      } catch (error) {
        setRoles(defaultRole);
        console.log(error);
      }
    }

    getRoles("/role", "GET");
  }, []);

  const methods = useForm({
    mode: "onTouched",
  });
  const { handleSubmit } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit = (data: any) => {
    // !STARTERCONF Remove console log, use logger instead
    // eslint-disable-next-line no-console
    // console.log({ data });

    const bodyData = {
      StaffName: data.name,
      IsActive: data.staff_status === "true" ? true : false,
      Roles: parseInt(data.staff_role) ?? 0,
    };

    console.log({ bodyData });
    return;
  };
  //#endregion  //*======== Form Submit ===========

  return (
    <div>
      <Button buttonname="" onClick={() => setOpen(true)} style="">
        {open ? "" : <PiUserPlusBold style={{ fontSize: "24px" }} />}
      </Button>

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
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-center sm:justify-center">
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-base font-semibold leading-6 text-gray-900"
                            >
                              Penambahan Staff
                            </Dialog.Title>
                            <div className="mt-2 text-gray-900">
                              <NewInput
                                id="name"
                                label="Name"
                                validation={{ required: "Name must be filled" }}
                                placeholder="Enter staff name"
                              />
                              <div className="min-w-[220px] mt-4">
                                <SelectInput
                                  id="staff_role"
                                  label="Staff role"
                                  placeholder="Select staff role"
                                  validation={{
                                    required: "Staff role must be filled",
                                  }}
                                  options={defaultRole.map((role) => ({
                                    value: role.id.toString(),
                                    label: role.RoleName,
                                  }))}
                                />
                              </div>
                              <div className="mt-4">
                                <SelectInput
                                  id="staff_status"
                                  label="Staff status"
                                  placeholder="Select staff status"
                                  validation={{
                                    required: "Staff status must be filled",
                                  }}
                                  options={[
                                    { value: "true", label: "Active" },
                                    {
                                      label: "Inactive",
                                      value: "false",
                                    },
                                  ]}
                                />
                              </div>

                              <div className="mt-4">
                                <DropzoneInput
                                  id="staff_image"
                                  label="Staff Image"
                                  setImageSource={setImageSrc}
                                  validation={{
                                    required: "Photo must be filled",
                                  }}
                                  accept={{
                                    "image/*": [".png", ".jpg", ".jpeg"],
                                  }}
                                  helperText="You can upload file with .png, .jpg, atau .jpeg extension."
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-10 mx-4 text-gray-900 max-w-[220px]">
                            <div className="max-w-180 mx-auto">
                              {imageSrc && (
                                <Image
                                  src={imageSrc}
                                  alt="Image 180 x 180"
                                  className="cursor-pointer max-w-full max-h-full ml-4"
                                  width={180}
                                  height={180}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                          // onClick={() => setOpen(false)}
                        >
                          Tambahkan
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
