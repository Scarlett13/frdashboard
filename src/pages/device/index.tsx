// import ButtonDevice from "@/components/buttondevice";
// import Card from "@/components/card";
import Layout from "@/components/layouts/layout";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

export default function Device() {
  const { token, authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoading === undefined) {
      return;
    }
    if (!authLoading && !token) {
      router.push("/");
    }
  }, [token, authLoading]);

  return <Layout showSideBar={true}>{""}</Layout>;
}

Device.authenticate = true;
