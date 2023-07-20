import Card from "@/components/card";
import Bacground from "@/components/background";
import Button from "@/components/button";
import Input from "@/components/input";
import { useRouter } from "next/router";

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

  fetch("http://192.168.10.31:8000/auth/login")
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  const router = useRouter();

  return (
    <Card>
      <Bacground title={"Login"}>
        <Input
          title={"Username/Email"}
          placeholder={"Username / Email"}
          type={"text"}
        />
        <Input title={"Password"} placeholder={"Password"} type={"password"} />
        <Button
          buttonname={"Login"}
          style={"w-full"}
          onClick={() => router.push("/device")}
        />
      </Bacground>
    </Card>
  );
}
