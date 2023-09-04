import Button from "@/components/button";
import Card from "@/components/card";
import { provideRequestOptions } from "@/libs/api";
import { useState } from "react";

export default function TestingApi() {
  const [data, setData] = useState<any>();

  async function name(
    url: string,
    method: string,
    params?: string,
    body?: string
  ) {
    const request = provideRequestOptions({ path: url, method });

    try {
      fetch(request)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          console.log(data);
        });
    } catch (error) {
      console.log(error);
      setData(error);
    }
  }
  return (
    <div className="h-screen">
      <div className="flex justify-between w-full h-20 shadow-xl bg-white items-center">
        <Button
          buttonname={"GET"}
          onClick={() => name("/staff", "GET")}
          style="mx-20"
        />
        <Button
          buttonname={"POST"}
          onClick={() => name("/staff", "POST")}
          style="mx-20"
        />
        <Button
          buttonname={"PUT"}
          onClick={() => name("/staff", "PUT")}
          style="mx-20"
        />
        <Button
          buttonname={"LIST"}
          onClick={() => name("/staff", "GET")}
          style="mx-20"
        />
        <Button
          buttonname={"DELETE"}
          onClick={() => name("/staff", "DELETE")}
          style="mx-20"
        />
      </div>
      <div className="mx-9 grid grid-cols-4 gap-4 overflow-auto h-[40rem] p-8 place-content-between">
        {/* {`${JSON.stringify(data)}`} */}
        {data &&
          data.map(
            ({ StaffDepartment, StaffImage, StaffName, StaffSound, id }) => (
              <Card key={id}>
                {/* <div className="w-full flex flex-row justify-between px-6 items-center bg-gray-200">
                  <h4 className="">{StaffDepartment}</h4>
                  <Modal />
                </div> */}
                <div className="flex flex-row mt-4 px-6">
                  <div>
                    <p>Staff Name</p>
                    <p>Staff Department</p>
                    <p>Staff Image</p>
                    <p>Staff Sound</p>
                  </div>
                  <div>
                    <p>: {StaffName}</p>
                    <p>: {StaffDepartment}</p>
                    <p>: {StaffImage}</p>
                    <p>: {StaffSound}</p>
                  </div>
                </div>
                {/* <div className="w-full flex flex-row mx-64">
                  <ButtonDelete />
                </div> */}
              </Card>
            )
          )}
      </div>
    </div>
  );
}
