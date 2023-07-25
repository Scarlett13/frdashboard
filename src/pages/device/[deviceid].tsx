import ButtonDevice from "@/components/buttondevice";
import Card from "@/components/card";
import Layout from "@/components/layout";
import { provideGetRequest } from "@/libs/api";
import { Device } from "@/type/device";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Device() {
  const router = useRouter();
  const { query } = router;

  const [data, setData] = useState<Device>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    console.log(query);
    setLoading(true);

    if (query.deviceid) {
      const request = provideGetRequest(`device/${query.deviceid}`);

      try {
        fetch(request)
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setLoading(false);
            console.log(data);
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }, [query]);
  return (
    <Layout showSideBar={true}>
      <div className="me-9 pt-6 text">
        <Card style="p-8 border border-gray-300">
          <div>
            <p>Divisi:</p>
            <p>Jumlah: {data?.Users.length}</p>
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
