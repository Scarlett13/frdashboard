import LogLayout from "@/components/layoutlog";
import ModalLog from "@/components/modallog";
import { useRouter } from "next/router";

export default function Log() {
  const router = useRouter();
  return (
    <LogLayout>
      <div className="mx-9 pt-24 text">
        <ModalLog />
      </div>
    </LogLayout>
  );
}
