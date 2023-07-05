import Card from "@/components/card";
import Button from "@/components/button";

export default function Device() {
  const staffs = [
    {
      id: 1,
      staffId: "A123",
      name: "Test1",
      status: "Active",
    },
    {
      id: 2,
      staffId: "A456",
      name: "Test2",
      status: "Active",
    },
    {
      id: 3,
      staffId: "A789",
      name: "Test3",
      status: "Deactive",
    },
    {
      id: 4,
      staffId: "b789",
      name: "Test4",
      status: "Deactive",
    },
  ];

  return (
    <div className="h-screen">
      <div className="ms-9">
        <h1 className="text-2xl font-bold">Device 1</h1>
      </div>
      <div className="mx-9">
        {staffs.map(({ id, staffId, name, status }) => (
          <Card key={id}>
            <div className="w-full flex flex-row justify-between items-center">
              <h4 className="">{staffId}</h4>
              <Button buttonname={"edit"} style={"w-1/4"} />
            </div>
            <div className="flex flex-row mt-4">
              <div>
                <p>Name</p>
                <p>Status</p>
              </div>
              <div>
                <p>: {name}</p>
                <p>: {status}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
