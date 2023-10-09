import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PiUserPlusBold } from "react-icons/pi";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import { provideRequestOptions } from "@/libs/api";
import { Role } from "@/type/role";
import { BsCloudUploadFill } from "react-icons/bs";
import { Staff } from "@/type/staff";
import { url } from "inspector";
import { LiaUserEditSolid } from "react-icons/lia";
import { useRouter } from "next/router";
import Button from "../button";
import NewInput from "../new-forms-components/new-input";
import SelectInput from "../new-forms-components/select-input";
import DropzoneInput from "../new-forms-components/dropzoneinput";

async function submitData(data: any) {
  let fd = new FormData();
  fd.append(
    "image",
    data.staff_image[0],
    "/C:/Users/visi2/Downloads/yudha.png"
  );

  //provide request options for upload data
  const uploadFileRequest = await provideRequestOptions({
    path: "/file/image",
    method: "POST",
    isUpload: true,
    body: fd,
  });

  if (!uploadFileRequest) {
    return;
  }

  //trycatch upload data
  try {
    const uploadDataResponse = await fetch(uploadFileRequest);

    if (uploadDataResponse.ok) {
      const uploadData = await uploadDataResponse.json();
      const bodyData = {
        StaffName: data.name,
        IsActive: data.staff_status === "true" ? true : false,
        StaffDepartment: data.staff_department,
        StaffImage: uploadData.Path,
        StaffSound: "",
      };

      const createNewStaff = await provideRequestOptions({
        path: "/staff",
        method: "POST",
        body: JSON.stringify(bodyData),
      });

      if (!createNewStaff) {
        return;
      }

      const createStaffResponse = await fetch(createNewStaff);

      if (createStaffResponse.ok) {
        return 1;
      } else {
        return 0;
      }
    }
  } catch (error) {
    return 0;
    console.log("error");
    console.log(error);
  }

  return;
}

async function editData(data: any, staffId: number) {
  try {
    const bodyData = {
      StaffName: data.name,
      IsActive: data.staff_status === "true" ? true : false,
      StaffDepartment: data.staff_department,
      StaffRole: {
        Update: data.staff_role.map((role: string) => parseInt(role, 10)),
      },
    };

    const createNewStaff = await provideRequestOptions({
      path: `/staff/${staffId}`,
      method: "PUT",
      body: JSON.stringify(bodyData),
    });

    if (!createNewStaff) {
      return;
    }

    const createStaffResponse = await fetch(createNewStaff);

    if (createStaffResponse.ok) {
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    return 0;
  }
}

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

interface IModalAddStaff {
  isEdit: boolean;
  staffId?: number;
  setSuccess: any;
}

export default function ModalAddStaff({
  isEdit,
  staffId,
  setSuccess,
}: IModalAddStaff) {
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const cancelButtonRef = useRef(null);

  //function close modal untuk clear form dan tutup modal add staff
  function closeModal() {
    setOpen(false);
    reset({
      name: "",
      staff_department: "",
      staff_roles: [],
      staff_status: "",
      staff_image: "",
    });
    setImageSrc("");
    setSuccess(true);
  }

  //useeffect hook untuk dapatkan staff roles, kalau lagi error untuk fetch, pakai variable default staff role diatas
  useEffect(() => {
    async function getRoles(url: string, method: string) {
      const request = await provideRequestOptions({ path: url, method });
      if (!request) {
        return;
      }
      try {
        const response = await fetch(request);
        const rolesData = await response.json();
        console.log("wubba", rolesData);
        if (rolesData.serialized_items) {
          setRoles(rolesData.serialized_items);
          // if (response.ok) {
          //   setRoles(defaultRole);
          // }
        } else {
          setRoles(defaultRole);
        }
      } catch (error) {
        setRoles(defaultRole);
        console.log(error);
      }
    }

    getRoles("/role?PerPage=100&Page=1", "GET");
  }, []);

  //#region  //*=========== Form ===========
  const methods = useForm({
    mode: "onTouched",
  });
  const { handleSubmit, reset, setValue } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit = async (data: any) => {
    // !STARTERCONF Remove console log, use logger instead
    // eslint-disable-next-line no-console
    // console.log({ data });

    setIsLoading(true);
    let status: number | undefined = 0;

    if (isEdit) {
      status = await editData(data, staffId as number);
    } else {
      status = await submitData(data);
    }

    setIsLoading(false);

    if (status) {
      closeModal();
    }

    //prepare for upload image
    /* TODO: update filename ngikutin sanitised fullname ditambah .png*/
  };
  //#endregion  //*======== Form Submit ===========

  useEffect(() => {
    console.log(`${staffId} - ${isEdit}`);
    if (!isEdit || !staffId) {
      return;
    }

    async function getStaff(
      url: string,
      method: string,
      params?: string,
      body?: string
    ) {
      const request = await provideRequestOptions({ path: url, method });
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
          .then((data: Staff) => {
            // Handle the successful response here
            // You can set the state or perform other actions with the data
            setValue("name", data.StaffName || "");
            setValue("staff_department", data.StaffDepartment || "");
            setValue(
              "staff_role",
              data.Roles.map((number) => number.toString()) || []
            );
            setValue("staff_image", "" || "");
            setValue("staff_status", data.IsActive.toString() || "");
            console.log(data);
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

    getStaff(`/staff/${staffId || "0"}`, "GET");
  });

  return (
    <div className={`${isEdit && "w-full flex justify-between items-center"}`}>
      {isEdit ? (
        <div
          className="inline-flex px-2 w-full justify-between gap-9 items-center cursor-pointer text-black hover:underline mt-2"
          onClick={() => setOpen(true)}
        >
          <p>Edit</p>
          <LiaUserEditSolid />
        </div>
      ) : (
        <Button buttonname="" onClick={() => setOpen(true)} style="">
          {open ? "" : <PiUserPlusBold style={{ fontSize: "24px" }} />}
        </Button>
      )}

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => {
            isLoading ? null : closeModal();
          }}
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
                <Dialog.Panel className="flex overflow-scroll transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
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
                                disabled={isLoading}
                              />
                              <div className="min-w-[220px] mt-4">
                                <NewInput
                                  id="staff_department"
                                  label="Staff department"
                                  placeholder="Select staff department"
                                  validation={{
                                    required: "Staff department must be filled",
                                  }}
                                  disabled={isLoading}
                                />
                              </div>
                              {isEdit && (
                                <div className="min-w-[220px] mt-4">
                                  <SelectInput
                                    id="staff_role"
                                    label="Staff role"
                                    placeholder="Select staff role"
                                    isMulti={true}
                                    validation={{
                                      required: "Staff role must be filled",
                                    }}
                                    options={roles.map((role) => ({
                                      value: role.id.toString(),
                                      label: role.RoleName,
                                    }))}
                                    disabled={isLoading}
                                  />
                                </div>
                              )}
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
                                  disabled={isLoading}
                                />
                              </div>

                              {!isEdit && (
                                <div className="mt-4">
                                  {isLoading ? (
                                    "Uploading..."
                                  ) : (
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
                                  )}
                                </div>
                              )}
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
                          disabled={isLoading}
                          className="disabled:cursor-not-allowed disabled:bg-blue-300 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                          // onClick={() => setOpen(false)}
                        >
                          {isLoading
                            ? "Mohon Tunggu"
                            : isEdit
                            ? "Update"
                            : "Tambahkan"}
                        </button>
                        <button
                          type="button"
                          className="disabled:cursor-not-allowed disabled:bg-gray-300 mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => {
                            closeModal();
                          }}
                          ref={cancelButtonRef}
                          disabled={isLoading}
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
