import Card from "@/components/card";
import Layout from "@/components/layout";
import { Staff } from "@/type/staff";
import { useEffect, useState } from "react";
import { provideRequestOptions } from "@/libs/api";
import ModalAddStaff from "@/components/modaladdstaff";
import PopOverStaff from "@/components/popoverstaff";

export default function Staff() {
  const [listStaff, setListStaff] = useState<any>();
  const [success, setSuccess] = useState<boolean>(false);

  async function getStaff(
    url: string,
    method: string,
    params?: string,
    body?: string
  ) {
    const request = provideRequestOptions({ path: url, method });

    try {
      fetch(request)
        .then((res) => res.json())
        .then((staff) => {
          if (staff) {
            setListStaff(staff);
          }

          setSuccess(false);
          console.log(staff);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getStaff("/staff", "GET");
  }, []);

  useEffect(() => {
    if (success) {
      getStaff("/staff", "GET");
    }
  }, [success]);

  return (
    <Layout showSideBar={false}>
      <div className="ms-9 flex flex-col gap-4">
        <h1 className="text-2xl font-bold py-4">Staff List</h1>
      </div>
      <div className="mx-4 md:mx-9 p-4 md:p-8">
        <div className="grid grid-cols-4 w-full gap-4 max-h-[35rem] overflow-x-hidden">
          {listStaff?.map((staff: Staff) => (
            <Card key={staff.id} style="bg-white hover:bg-slate-50">
              <div className="w-full mt-4 flex flex-row justify-between px-6 items-center">
                <h4 className="">{staff.id}</h4>
                <PopOverStaff popoverStaff={staff} setSuccess={setSuccess} />
              </div>
              <div className="flex flex-row mt-4 px-6 items-center">
                <div className="mr-4">
                  <img
                    src={`http://192.168.10.31:5000/file/image/${staff.StaffImage}`}
                    alt={`${staff.StaffName}'s image`}
                  />
                </div>
                <div>
                  <p>Staff Name</p>
                  <p>Staff Department</p>
                </div>
                <div>
                  <p>: {staff.StaffName}</p>
                  <p>: {staff.StaffDepartment}</p>
                </div>
              </div>
            </Card>
          ))}
          <div className="mt-9 ml-20">
            <ModalAddStaff />
          </div>
        </div>
      </div>
    </Layout>
  );
}
