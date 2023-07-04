import Card from "@/components/card";
import Bacground from "@/components/background";
// import UserName from "@/components/username";
// import Password from "@/components/password";
import Button from "@/components/button";
import Input from "@/components/input";
export default function Login() {
  return (
    <Card>
      <Bacground title={"Login"}>
        {/* <UserName />
        <Password /> */}

        <Input
          title={"Username/Email"}
          placeholder={"Username / Email"}
          type={"text"}
        />
        <Input title={"Password"} placeholder={"Password"} type={"password"} />
        <Button buttonname={"Login"} />
      </Bacground>
    </Card>
  );
}
