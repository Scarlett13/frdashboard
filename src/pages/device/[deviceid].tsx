import ButtonDevice from "@/components/buttondevice";
import Card from "@/components/card";
import Layout from "@/components/layout";
import { useRouter } from "next/router";

export default function Device() {
  const router = useRouter();
  const { query } = router;
  console.log(query, "<<<<<<");
  return (
    <Layout showSideBar={true}>
      <div className="me-9 pt-6 text">
        <Card>
          <div>
            <p>Divisi:</p>
            <p>Jumlah: {query.deviceid}</p>
            <div className=" text-right">
              <a href="/staff">
                <ButtonDevice buttonname={"View Staff"}></ButtonDevice>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
