import ButtonDevice from "@/components/buttondevice";
import Card from "@/components/card";
import Layout from "@/components/layouts/layout";
import { useAuth } from "@/contexts/auth-context";
import { provideRequestOptions } from "@/libs/api";
import { Device } from "@/type/device";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Device() {
  const router = useRouter();
  const { query } = router;
  const { deviceid } = query;

  const [data, setData] = useState<Device>();
  const [isLoading, setLoading] = useState(false);

  const { token, authLoading } = useAuth();

  useEffect(() => {
    if (authLoading === undefined) {
      return;
    }
    if (!authLoading && !token) {
      router.push("/");
    }
  }, [token, authLoading]);

  useEffect(() => {
    async function listdevices() {
      setLoading(true);

      if (!query.deviceid) {
        return;
      }
      const request = await provideRequestOptions({
        path: `/device/${deviceid}`,
        method: "GET",
      });

      if (!request) {
        return;
      }

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
        setLoading(false);
      }
    }

    if (!isLoading) {
      listdevices();
    }
  }, [query]);
  return (
    <Layout showSideBar={true}>
      <div className="me-9 ms-9 pt-40 text">
        {data ? (
          <Card style="p-8 border border-gray-300">
            <div className="ms-9 flex flex-col items-start">
              <h1 className="text-2xl font-bold py-4">{data.DeviceName}</h1>
            </div>
            <div>
              <p>Divisi:</p>
              <p>Jumlah: {data.Users.length}</p>
              <div className=" text-right">
                <a href="/staff">
                  <ButtonDevice buttonname={"View Staff"}></ButtonDevice>
                </a>
              </div>
            </div>
          </Card>
        ) : (
          <Card style="p-8 border border-gray-300">
            <div className="ms-9 flex flex-col gap-4">
              <h1 className="text-2xl font-bold py-4">No data</h1>
            </div>
            <div>
              <p>Divisi: -</p>
              <p>Jumlah: -</p>
              <div className=" text-right">
                <a href="/staff">
                  <ButtonDevice buttonname={"View Staff"}></ButtonDevice>
                </a>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}
