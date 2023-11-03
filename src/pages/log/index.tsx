import Card from "@/components/card";
import LogLayout from "@/components/layouts/layoutlog";
import { TableLogAccess } from "@/components/tableaccesslog";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Log() {
  const router = useRouter();
  const { token, authLoading } = useAuth();

  useEffect(() => {
    console.log(token);
    if (authLoading === undefined) {
      return;
    }
    if (!authLoading || !token) {
      router.push("/");
    }
  }, [token, authLoading]);

  return (
    <LogLayout>
      <div className="pt-24 text bg-white">{<TableLogAccess />}</div>
    </LogLayout>
  );
}