import Card from "@/components/card";
import Bacground from "@/components/background";
import Button from "@/components/button";
import Input from "@/components/input";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    UserLogin: "Visi",
    UserPassword: "Visi2021",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://192.168.10.31:5000/auth/login")
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Card>
      <Bacground title={"Welcome"}>
        <div className="flex flex-col gap-4">
          <Input
            title={"Username/Email"}
            placeholder={"Username / Email"}
            type={"text"}
          />
          <Input
            title={"Password"}
            placeholder={"Password"}
            type={"password"}
          />
          <Button
            buttonname={"Login"}
            style={"w-full"}
            onClick={() => router.push("/device")}
            isLoading={isLoading}
          />
        </div>
      </Bacground>
    </Card>
  );
}
