import ButtonDelete from "@/components/modaldelete";
import Card from "@/components/card";
import Layout from "@/components/layout";
import Modal from "@/components/modal";
import { Staff } from "@/type/staff";
import { useEffect, useState } from "react";
import { provideRequestOptions } from "@/libs/api";
import ModalAddStaff from "@/components/modaladdstaff";

export default function Staff() {
  const [staff, setStaff] = useState<any>();

  async function getStaff(
    url: string,
    method: string,
    params?: string,
    body?: string
  ) {
    const request = provideRequestOptions(url, method);

    try {
      fetch(request)
        .then((res) => res.json())
        .then((staff) => {
          setStaff(staff);
          console.log(staff);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getStaff("/staff", "GET");
  }, []);

  return (
    <Layout showSideBar={false}>
      <div className="ms-9 flex flex-col gap-4">
        <h1 className="text-2xl font-bold py-4">Staff List</h1>
      </div>
      <div className="mx-4 md:mx-9 p-4 md:p-8">
        <div className="grid grid-cols-4 gap-4 overflow-y-scroll max-h-[35rem] overflow-x-hidden">
          {staff?.map((staffs: Staff) => (
            <Card key={staffs.id}>
              <div className="w-full flex flex-row justify-between px-6 items-center">
                <h4 className="">{staffs.FaceFeatures}</h4>
                <Modal />
              </div>
              <div className="flex flex-row mt-4 px-6">
                <div>
                  <p>Staff Name</p>
                  <p>Staff Department</p>
                </div>
                <div>
                  <p>: {staffs.StaffName}</p>
                  <p>: {staffs.StaffDepartment}</p>
                </div>
              </div>
              <div className="w-full flex flex-row px-6 items-center justify-end pb-4">
                <ButtonDelete path={`/staff/${staffs.id}`} />
              </div>
            </Card>
          ))}
          <div className="mt-14 ml-20">
            <ModalAddStaff />
          </div>
        </div>
      </div>
    </Layout>
  );
}
