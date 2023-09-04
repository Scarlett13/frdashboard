import LogLayout from "@/components/layoutlog";
import ModalLog from "@/components/modallog";
import { provideRequestOptions } from "@/libs/api";
import { Log } from "@/type/log";
import { useEffect, useState } from "react";

export default function Log() {
  const [log, setLog] = useState<any>();
  const [isLoading, setLoading] = useState(false);

  async function getLog(
    url: string,
    method: string,
    params?: string,
    body?: string
  ) {
    const request = provideRequestOptions({ path: url, method });

    try {
      fetch(request)
        .then((res) => res.json())
        .then((log) => {
          setLog(log);
          console.log(log);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLog("/access_log", "GET");
  });
  return (
    <LogLayout>
      <div className="mx-9 pt-24 text">
        <ModalLog />
      </div>
    </LogLayout>
  );
}
