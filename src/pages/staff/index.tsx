import ButtonDelete from "@/components/modaldelete";
import Card from "@/components/card";
import Layout from "@/components/layout";
import Modal from "@/components/modal";
import { Staff } from "@/type/staff";
import { get } from "http";

export default function Staff() {
  const staffs: Staff[] = [
    {
      FaceFeature: 1,
      IsActive: true,
      Roles: 1,
      StaffDepartment: "Infra",
      StaffImage: "",
      StaffName: "test",
      StaffSound: "",
      Id: 1,
    },
    {
      FaceFeature: 2,
      IsActive: true,
      Roles: 2,
      StaffDepartment: "Infra",
      StaffImage: "",
      StaffName: "test2",
      StaffSound: "",
      Id: 2,
    },
    {
      FaceFeature: 3,
      IsActive: true,
      Roles: 3,
      StaffDepartment: "Infra",
      StaffImage: "",
      StaffName: "test3",
      StaffSound: "",
      Id: 3,
    },
    {
      FaceFeature: 4,
      IsActive: true,
      Roles: 4,
      StaffDepartment: "Infra",
      StaffImage: "",
      StaffName: "test4",
      StaffSound: "",
      Id: 4,
    },
    {
      FaceFeature: 5,
      IsActive: true,
      Roles: 5,
      StaffDepartment: "Infra",
      StaffImage: "",
      StaffName: "test5",
      StaffSound: "",
      Id: 5,
    },
    {
      FaceFeature: 6,
      IsActive: true,
      Roles: 6,
      StaffDepartment: "Infra",
      StaffImage: "",
      StaffName: "test6",
      StaffSound: "",
      Id: 6,
    },
    {
      FaceFeature: 7,
      IsActive: true,
      Roles: 7,
      StaffDepartment: "Infra",
      StaffImage: "",
      StaffName: "test7",
      StaffSound: "",
      Id: 7,
    },
    {
      FaceFeature: 8,
      IsActive: true,
      Roles: 8,
      StaffDepartment: "Infra",
      StaffImage: "",
      StaffName: "test8",
      StaffSound: "",
      Id: 8,
    },
    {
      FaceFeature: 9,
      IsActive: true,
      Roles: 9,
      StaffDepartment: "Infra",
      StaffImage: "",
      StaffName: "test9",
      StaffSound: "",
      Id: 9,
    },
    {
      FaceFeature: 10,
      IsActive: true,
      Roles: 10,
      StaffDepartment: "Infra",
      StaffImage: "",
      StaffName: "test10",
      StaffSound: "",
      Id: 10,
    },
    {
      FaceFeature: 11,
      IsActive: true,
      Roles: 11,
      StaffDepartment: "Infra",
      StaffImage: "",
      StaffName: "test11",
      StaffSound: "",
      Id: 11,
    },
    {
      FaceFeature: 12,
      IsActive: true,
      Roles: 12,
      StaffDepartment: "Infra",
      StaffImage: "",
      StaffName: "test12",
      StaffSound: "",
      Id: 12,
    },
    {
      FaceFeature: 13,
      IsActive: true,
      Roles: 13,
      StaffDepartment: "Infra",
      StaffImage: "",
      StaffName: "test13",
      StaffSound: "",
      Id: 13,
    },
  ];

  return (
    <Layout showSideBar={false}>
      <div className="ms-9">
        <h1 className="text-2xl font-bold py-4">Staff List</h1>
      </div>
      <div className="mx-4 md:mx-9 p-4 md:p-8">
        <div className="grid grid-cols-4 gap-4 overflow-y-scroll max-h-[35rem] overflow-x-hidden">
          {staffs.map(
            ({
              FaceFeature,
              IsActive,
              Roles,
              StaffDepartment,
              StaffImage,
              StaffName,
              StaffSound,
              Id,
            }) => (
              <Card key={Id}>
                <div className="w-full flex flex-row justify-between px-6 items-center">
                  <h4 className="">{FaceFeature}</h4>
                  <Modal />
                </div>
                <div className="flex flex-row mt-4 px-6">
                  <div>
                    <p>Staff Name</p>
                    <p>Staff Department</p>
                  </div>
                  <div>
                    <p>: {StaffName}</p>
                    <p>: {StaffDepartment}</p>
                  </div>
                </div>
                <div className="w-full flex flex-row mx-64">
                  <ButtonDelete />
                </div>
              </Card>
            )
          )}
        </div>
      </div>
    </Layout>
  );
}
