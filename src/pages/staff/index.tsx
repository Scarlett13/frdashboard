import Layout from "@/components/layout";
import { Staff } from "@/type/staff";
import { useEffect, useState } from "react";
import { provideRequestOptions } from "@/libs/api";
import ModalAddStaff from "@/components/modaladdstaff";
import PopOverStaff from "@/components/popoverstaff";
import Image from "next/image";
import Typography from "@/components/new-forms-components/typography";
import Card from "@/components/new-forms-components/card";

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
          setListStaff(staff.serialized_items);
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
      <div className="container p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4 max-h-[35rem] overflow-x-hidden">
          {listStaff?.map((staff: Staff) => (
            <Card
              className={`${staff.IsActive ? "bg-green-100" : "bg-red-100"}`}
              key={staff.id}
              title={`${staff.id}. ${staff.StaffName}`}
            >
              <Card.Section>
                <div className="">
                  <div className="w-full mt-4 flex flex-row justify-between px items-center">
                    <div className="flex flex-row">
                      <div>
                        <p>Tim</p>
                      </div>
                      <div>
                        <p>: {staff.StaffDepartment}</p>
                      </div>
                    </div>
                    <PopOverStaff
                      popoverStaff={staff}
                      setSuccess={setSuccess}
                    />
                  </div>

                  <div className="w-full flex items-center justify-center my-4">
                    <Image
                      src={`http://192.168.10.31:5000/file/image/${staff.StaffImage}`}
                      alt={`${staff.StaffName}'s image`}
                      height={100}
                      width={100}
                    />
                  </div>
                </div>
              </Card.Section>
              <Card.Section>
                <div className="w-full">
                  <Typography variant="b2">{`Face features ${
                    staff.FaceFeatures ? "Registered" : "Not Registered"
                  }`}</Typography>
                </div>
              </Card.Section>
            </Card>
          ))}
          <div className="mt-9 ml-20">
            <ModalAddStaff isEdit={false} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
