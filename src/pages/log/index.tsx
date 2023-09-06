import Card from "@/components/card";
import LogLayout from "@/components/layoutlog";
import { TableLogAccess } from "@/components/tableaccesslog";

export default function Log() {
  return (
    <LogLayout>
      <div className="pt-24 text bg-white">
        <Card>
          <div className="mx-9 h-screen">{<TableLogAccess />}</div>
        </Card>
      </div>
    </LogLayout>
  );
}
