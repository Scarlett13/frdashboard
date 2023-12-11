/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { provideRequestOptions } from '@/lib/api';

import Button from '../buttons/Button';
import DropzoneInput from '../forms/DropzoneInput';
import Input from '../forms/Input';
import SearchableSelectInput from '../forms/SearchableSelectInput';

import { Person } from '@/types/person';
import { Role } from '@/types/role';

async function submitData(data: any) {
  const fd = new FormData();
  fd.append('image', data.staff_image[0], 'filename');

  //provide request options for upload data
  const uploadFileRequest = await provideRequestOptions({
    path: '/file/image',
    method: 'POST',
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
        IsActive: data.staff_status === 'true' ? true : false,
        StaffDepartment: data.staff_department,
        StaffImage: uploadData.Path,
        StaffSound: '',
        idTeam: 0,
      };

      const createNewStaff = await provideRequestOptions({
        path: '/staff',
        method: 'POST',
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
  }

  return;
}

async function editData(data: any, staffId: number) {
  try {
    const bodyData = {
      StaffName: data.name,
      IsActive: data.staff_status === 'true' ? true : false,
      StaffDepartment: data.staff_department,
      StaffRole: {
        Update: data.staff_role.map((role: string) => parseInt(role, 10)),
      },
    };

    const createNewStaff = await provideRequestOptions({
      path: `/staff/${staffId}`,
      method: 'PUT',
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
    RoleName: 'Staff',
  },
  {
    id: 2,
    RoleName: 'Admin',
  },
  {
    id: 3,
    RoleName: 'Developer',
  },
];

interface IModalAddStaff {
  isEdit: boolean;
  staffId?: number;
  setSuccess: any;
  imagesource?: string;
}

export default function ModalAddStaff({
  isEdit,
  staffId,
  setSuccess,
  imagesource,
}: IModalAddStaff) {
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cancelButtonRef = useRef(null);

  const router = useRouter();

  //function close modal untuk clear form dan tutup modal add staff
  function closeModal() {
    setOpen(false);
    reset({
      name: '',
      staff_department: '',
      staff_roles: [],
      staff_status: '',
      staff_image: '',
    });
    setImageSrc('');
    if (setSuccess) setSuccess(true);
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
      }
    }

    getRoles('/role?PerPage=100&Page=1', 'GET');
  }, []);

  //#region  //*=========== Form ===========
  const methods = useForm({
    mode: 'onTouched',
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
      router.refresh();
    }

    //prepare for upload image
    /* TODO: update filename ngikutin sanitised fullname ditambah .png*/
  };
  //#endregion  //*======== Form Submit ===========

  useEffect(() => {
    if (!isEdit || !staffId) {
      return;
    }

    async function getStaff(url: string, method: string) {
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
          .then((data: Person) => {
            // Handle the successful response here
            // You can set the state or perform other actions with the data
            setValue('name', data.PersonName || '');
            setValue('staff_department', data.PersonDepartment || '');
            setValue(
              'staff_role',
              data.Roles.map((number: any) => number.toString()) || []
            );
            setValue('staff_image', '' || '');
            setValue('staff_status', data.IsActive.toString() || '');
          })
          .catch(() => {
            // Handle the error here
          });
      } catch (error) {
        // Handle any synchronous errors that occur before the fetch
      }
    }

    getStaff(`/staff/${staffId || '0'}`, 'GET');
  });

  return (
    <div className={`${isEdit ? 'flex justify-end gap-2' : 'w-2/5'}`}>
      {isEdit ? (
        <Button onClick={() => setOpen(true)}>Edit Staff</Button>
      ) : (
        <Button onClick={() => setOpen(true)}>Add Staff</Button>
      )}

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          initialFocus={cancelButtonRef}
          onClose={() => {
            isLoading ? null : closeModal();
          }}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <Dialog.Panel className='my-8 flex w-full max-w-xl transform overflow-scroll rounded-lg bg-white text-left shadow-xl transition-all'>
                  <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                        <div className='sm:flex sm:items-center sm:justify-center'>
                          <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                            <Dialog.Title
                              as='h3'
                              className='text-base font-semibold leading-6 text-gray-900'
                            >
                              Penambahan Staff
                            </Dialog.Title>
                            <div className='mt-2 text-gray-900'>
                              <Input
                                id='name'
                                label='Name'
                                validation={{ required: 'Name must be filled' }}
                                placeholder='Enter staff name'
                                disabled={isLoading}
                              />
                              <div className='mt-4 min-w-[220px]'>
                                <Input
                                  id='staff_department'
                                  label='Staff department'
                                  placeholder='Select staff department'
                                  validation={{
                                    required: 'Staff department must be filled',
                                  }}
                                  disabled={isLoading}
                                />
                              </div>
                              {isEdit && (
                                <div className='mt-4 min-w-[220px]'>
                                  <SearchableSelectInput
                                    id='staff_role'
                                    label='Staff role'
                                    placeholder='Select staff role'
                                    isMulti={true}
                                    validation={{
                                      required: 'Staff role must be filled',
                                    }}
                                    options={roles.map((role) => ({
                                      value: role.id.toString(),
                                      label: role.RoleName,
                                    }))}
                                    disabled={isLoading}
                                  />
                                </div>
                              )}
                              <div className='mt-4'>
                                <SearchableSelectInput
                                  id='staff_status'
                                  label='Staff status'
                                  placeholder='Select staff status'
                                  validation={{
                                    required: 'Staff status must be filled',
                                  }}
                                  options={[
                                    { value: 'true', label: 'Active' },
                                    {
                                      label: 'Inactive',
                                      value: 'false',
                                    },
                                  ]}
                                  disabled={isLoading}
                                />
                              </div>

                              {!isEdit && (
                                <div className='mt-4'>
                                  {isLoading ? (
                                    'Uploading...'
                                  ) : (
                                    <DropzoneInput
                                      id='staff_image'
                                      label='Staff Image'
                                      setImageSource={setImageSrc}
                                      validation={{
                                        required: 'Photo must be filled',
                                      }}
                                      accept={{
                                        'image/*': ['.png', '.jpg', '.jpeg'],
                                      }}
                                      helperText='You can upload file with .png, .jpg, atau .jpeg extension.'
                                    />
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className='mx-4 mt-10 min-w-[200px] text-gray-900'>
                            <div className='max-w-180 min-w-180 mx-auto'>
                              {imageSrc && (
                                <Image
                                  src={imageSrc}
                                  alt='Image 180 x 180'
                                  className='ml-4 max-h-full max-w-full cursor-pointer'
                                  width={180}
                                  height={180}
                                />
                              )}
                              {imagesource && (
                                <Image
                                  src={`http://192.168.10.31:5000/file/image/${imagesource}`}
                                  alt='Image 180 x 180'
                                  className='ml-4 max-h-full max-w-full cursor-pointer'
                                  width={180}
                                  height={180}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                        <button
                          type='submit'
                          disabled={isLoading}
                          className='inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-300 sm:ml-3 sm:w-auto'
                          // onClick={() => setOpen(false)}
                        >
                          {isLoading
                            ? 'Mohon Tunggu'
                            : isEdit
                            ? 'Update'
                            : 'Tambahkan'}
                        </button>
                        <button
                          type='button'
                          className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-300 sm:mt-0 sm:w-auto'
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
