import Card from "@/components/card";
import LogLayout from "@/components/layoutlog";
import { TableLogAccess, TableLogError } from "@/components/table";
import { useRouter } from "next/router";

export default function Log() {
  const router = useRouter();
  const { query } = router;
  console.log(query);
  return (
    <LogLayout ShowSideBarLog={true}>
      <div className="me-9 pt-6 text">
        <Card>
          <div>
            {query.logaccuracy === "accuracy-access" && <TableLogAccess />}
            {query.logaccuracy === "accuracy-error" && <TableLogError />}
          </div>
        </Card>
      </div>
    </LogLayout>
  );
}
