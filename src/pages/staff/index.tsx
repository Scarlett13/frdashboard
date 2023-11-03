import Card from "@/components/card";
import Layout from "@/components/layout";
import { Staff } from "@/type/staff";
import { useEffect, useState } from "react";
import { provideRequestOptions } from "@/libs/api";
import Navbar from "@/components/navigations/navbar";
import PopOverStaff from "@/components/popover/popover-staff";
import ModalAddStaff from "@/components/modals/modal-add-staff";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/auth-context";

export default function StaffPage() {
  const [listStaff, setListStaff] = useState<any>();
  const [success, setSuccess] = useState<boolean>(false);

  const { token, authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoading === undefined) {
      return;
    }
    if (!authLoading && !token) {
      router.push("/");
    }
  }, [token, authLoading]);

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
        .then((res) => res.json())
        .then((staff) => {
          const sortedData = staff.serialized_items.sort(
            (a: Staff, b: Staff) => a.id - b.id
          );
          setListStaff(sortedData);
          setSuccess(false);
          console.log(staff);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getStaff("/staff?PerPage=100&Page=1", "GET");
  }, []);

  useEffect(() => {
    if (success) {
      getStaff("/staff?PerPage=100&Page=1", "GET");
    }
  }, [success]);

  return (
    <Navbar>
      <div className="h-screen overflow-y-hidden">
        <div className="w-full mt-20">
          <div className="ms-9 flex flex-col gap-4">
            <h1 className="text-2xl font-bold py-4 mb-4">Staff List</h1>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-4 xl:max-h-[39rem] 2xl:max-h-[45rem] overflow-x-hidden">
            {listStaff?.map((staff: Staff, counter: number) => (
              <Card key={staff.id} style="bg-white hover:bg-slate-50">
                <div className="w-full mt-4 flex flex-row justify-between px-6 items-center">
                  <h4 className="">{counter + 1}</h4>
                  <PopOverStaff popoverStaff={staff} setSuccess={setSuccess} />
                </div>
                <div className="flex flex-row mt-4 px-6 items-center">
                  <div className="mr-4">
                    <Image
                      src={`http://192.168.10.31:5000/file/image/${staff.StaffImage}`}
                      alt={`${staff.StaffName}'s image`}
                      className="w-20 h-20 rounded-full object-cover"
                      width={80}
                      height={80}
                    />
                  </div>
                  {/* <div>
                    <p>Staff Name</p>
                    <p>Staff Department</p>
                  </div> */}
                  <div>
                    <p>{staff.StaffName}</p>
                    <p>{staff.StaffDepartment}</p>
                  </div>
                </div>
              </Card>
            ))}
            <div className="mt-20 ml-20">
              <ModalAddStaff isEdit={false} setSuccess={undefined} />
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
