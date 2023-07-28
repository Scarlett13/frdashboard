import Card from "@/components/card";
import LogLayout from "@/components/layoutlog";
import { TableLogAccess } from "@/components/tableaccesslog";

export default function Log() {
  return (
    <LogLayout>
      <div className="mx-9 pt-24 text">
        <Card>
          <div>{<TableLogAccess />}</div>
        </Card>
      </div>
    </LogLayout>
  );
}