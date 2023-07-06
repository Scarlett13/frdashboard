import Card from "@/components/card";
import Bacground from "@/components/background";
import Button from "@/components/button";
import Input from "@/components/input";

export default function Login() {
  return (
    <Card>
      <Bacground title={"Login"}>
        <Input
          title={"Username/Email"}
          placeholder={"Username / Email"}
          type={"text"}
        />
        <Input title={"Password"} placeholder={"Password"} type={"password"} />
        <Button buttonname={"Login"} style={"w-full"} onClick={""} />
      </Bacground>
    </Card>
  );
}
