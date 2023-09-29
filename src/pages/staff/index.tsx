import { Staff } from "@/type/staff";
import { useEffect, useState } from "react";
import { provideRequestOptions } from "@/libs/api";
import Image from "next/image";
import Typography from "@/components/new-forms-components/typography";
import Card from "@/components/new-forms-components/card";
import Layout from "@/components/layouts/layout";
import ModalAddStaff from "@/components/modals/modal-add-staff";
import PopOverStaff from "@/components/popover/popover-staff";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/auth-context";

export default function Staff() {
  const [listStaff, setListStaff] = useState<any>();
  const [success, setSuccess] = useState<boolean>(false);

  const router = useRouter();

  const { token, authLoading } = useAuth();

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

    setSuccess(false);
    if (!request) {
      return;
    }
    try {
      fetch(request)
        .then((res) => res.json())
        .then((staff) => {
          const sorted = staff.serialized_items.sort(
            (a: Staff, b: Staff) => a.id - b.id
          );
          setListStaff(sorted);
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
                      width={32}
                      height={32}
                      className="h-16 w-16 rounded-full"
                      fill={false}
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
            <ModalAddStaff isEdit={false} setSuccess={setSuccess} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
