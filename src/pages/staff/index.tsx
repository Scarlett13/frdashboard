import ButtonDelete from "@/components/modaldelete";
import Card from "@/components/card";
import Layout from "@/components/layout";
import Modal from "@/components/modal";
import { Staff } from "@/type/staff";
import { get } from "http";

export default function Staff() {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5MDE2Njc0MCwianRpIjoiYjIyOTBjZDItZmZjMC00MTAyLTg4ZGEtMjE2OTUwZmNmNjFmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IlZpc2kiLCJuYmYiOjE2OTAxNjY3NDAsImV4cCI6MTY5MDE3MDM0MH0.9wqLLFmqyNaDPuMrC-dMF9eoTK8vAqEDRiT-_qrz1GY"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://192.168.10.31:8000/staff")
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

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
  ];

  return (
    <Layout showSideBar={false}>
      <div className="ms-9">
        <h1 className="text-2xl font-bold py-4">Staff List</h1>
      </div>
      <div className="mx-9 grid grid-cols-4 gap-4 overflow-auto h-[40rem] p-8">
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
                <ButtonDelete/>
              </div>
            </Card>
          )
        )}
      </div>
    </Layout>
  );
}
