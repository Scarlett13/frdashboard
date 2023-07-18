// import ButtonDevice from "@/components/buttondevice";
// import Card from "@/components/card";
import Layout from "@/components/layout";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

export default function Device() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4OTY0NjkxMCwianRpIjoiN2FmZDc2OWEtNjVlYi00MzQ5LTk1ZjctNzk5ZGU3NzE0Njk0IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IlZpc2kiLCJuYmYiOjE2ODk2NDY5MTAsImV4cCI6MTY4OTY1MDUxMH0.OPCahVFYrpvr6YrakgFHw0PP4kchGYsMZA7KBoG_LcA"
  );
  const request = new Request(
    "http://192.168.10.31:8000/device/1e1e6b32-9552-54f0-91e9-677b3f9fa3ca",
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  useEffect(() => {
    setLoading(true);
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
    }
  }, []);
  return <Layout showSideBar={true}>{""}</Layout>;
}
