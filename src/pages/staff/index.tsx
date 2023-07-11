import Card from "@/components/card";
import Layout from "@/components/layout";
import Modal from "@/components/modal";

export default function Staff() {
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
    {
      id: 5,
      staffId: "b789",
      name: "Test4",
      status: "Deactive",
    },
    {
      id: 6,
      staffId: "A123",
      name: "Test1",
      status: "Active",
    },
    {
      id: 7,
      staffId: "A456",
      name: "Test2",
      status: "Active",
    },
    {
      id: 8,
      staffId: "A789",
      name: "Test3",
      status: "Deactive",
    },
    {
      id: 9,
      staffId: "b789",
      name: "Test4",
      status: "Deactive",
    },
    {
      id: 10,
      staffId: "b789",
      name: "Test4",
      status: "Deactive",
    },
  ];

  return (
    <Layout route={"Staff"}>
      <div className=" h-screen">
        <div className="ms-9">
          <h1 className="text-2xl font-bold pt-24">Staff List</h1>
        </div>
        <div className="mx-9 grid grid-cols-4 gap-4 h-2/3 overflow-auto">
          {staffs.map(({ id, staffId, name, status }) => (
            <Card key={id}>
              <div className="w-full flex flex-row justify-between items-center">
                <h4 className="">{staffId}</h4>
                <Modal />
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
    </Layout>
  );
}
