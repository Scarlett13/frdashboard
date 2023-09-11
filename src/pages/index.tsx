import Card from "@/components/card";
import Bacground from "@/components/background";
import Button from "@/components/button";
import Input from "@/components/input";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === "usernameOrEmail") {
      setUsernameError(false);
      setLoginError("");
    }
    if (name === "password") {
      setPasswordError(false);
      setLoginError("");
    }
  };

  const handleSubmit = () => {
    if (formData.usernameOrEmail && formData.password) {
      setIsLoading(true);

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        UserLogin: formData.usernameOrEmail,
        UserPassword: formData.password,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      fetch("http://192.168.10.31:5000/auth/login", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);

          if (result.includes("wrong email or password")) {
            setUsernameError(true);
            setPasswordError(true);
            setLoginError("Wrong email or password. Please try again.");
          } else {
            setUsernameError(false);
            setPasswordError(false);
            setLoginError("");
            router.push("/device");
          }
        })
        .catch((error) => {
          console.log("error", error);
          setLoginError("An error occurred. Please try again later.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      if (!formData.usernameOrEmail) {
        setUsernameError(true);
      }
      if (!formData.password) {
        setPasswordError(true);
      }
      setLoginError("Please fill in both fields.");
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <Card>
      <Bacground title={"Welcome"}>
        <div className="flex flex-col gap-4">
          <Input
            name={"usernameOrEmail"}
            title={"Username/Email"}
            placeholder={"Username / Email"}
            type={"text"}
            onChange={handleInputChange}
          />
          <Input
            name={"password"}
            title={"Password"}
            placeholder={"Password"}
            type={"password"}
            onChange={handleInputChange}
          />
          <Button
            buttonname={"Login"}
            style={"w-full"}
            onClick={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </Bacground>
    </Card>
  );
}
