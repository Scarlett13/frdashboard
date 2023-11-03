/* eslint-disable react-hooks/rules-of-hooks */
// import Card from "@/components/card";
// import Layout from "@/components/layout";
// import { TableLogAccess } from "@/components/tableaccesslog";

import { provideRequestOptions } from "@/libs/api";
import { useEffect, useState } from "react";

// export default function Testing() {
//   return (
//     <Layout showSideBar={true}>
//       <div className="grid grid-cols-2 w-full max-h-[50rem] overflow-hidden justify-between items-center gap-4">
//         <div className="pt-10 h-screen">
//           <div className="bg-black w-full h-screen text-center">
//             <Card style="">
//               <div className="max-h-[48rem] overflow-y-auto">
//                 <TableLogAccess />
//               </div>
//             </Card>
//           </div>
//         </div>
//         <div className="grid grid-row-2">
//           <div className="bg-black w-full h-80">
//             <Card>{"Monitoring Device"}</Card>
//           </div>
//           <div className="pb-4 bg-black w-full h-80">
//             <Card>{"Monitoring Staff"}</Card>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

export default async function testingLayoutSideBar() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const request = await provideRequestOptions({
    path: "/device",
    method: "GET",
  });

  if (!request) {
    return;
  }

  useEffect(() => {
    setLoading(true);
    try {
      fetch(request)
        .then((res) => res.json())
        .then((data) => {
          setData(data.serialized_items);
          setLoading(false);
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="h-screen">
      {/* <TestingLayoutSideBar listdevices={data}>{""}</TestingLayoutSideBar> */}
    </div>
  );
}
