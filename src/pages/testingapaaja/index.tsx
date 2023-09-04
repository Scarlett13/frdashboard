import Card from "@/components/card";
import Layout from "@/components/layout";
import { TableLogAccess } from "@/components/tableaccesslog";
import Pagination from "@/components/testingcomponents";
import { useState } from "react";

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

export default function Home() {
  const ITEM_PER_PAGES = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (PageNumber: number) => {
    setCurrentPage(PageNumber);
  };

  const data = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);

  const startIndex = (currentPage - 1) * ITEM_PER_PAGES;
  const visibleData = data.slice(startIndex, startIndex + ITEM_PER_PAGES);

  return (
    <div>
      <ul>
        {visibleData.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data.length / ITEM_PER_PAGES)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
