import Card from "@/components/card";
import Bacground from "@/components/layouts/background";
import Button from "@/components/button";
import Input from "@/components/input";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import NewInput from "@/components/new-forms-components/new-input";
import PasswordInput from "@/components/new-forms-components/password-input";
import { provideLoginRequest, setTokenCookie } from "@/libs/api";
import { useAuth } from "@/contexts/auth-context";

export default function Login() {
  const router = useRouter();
  const { token, authLoading } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // =========== Form ===========
  const methods = useForm<{ UserLogin: string; UserPassword: string }>({
    mode: "onTouched",
  });
  const { handleSubmit } = methods;
  // ======== End Form ===========

  // =========== Form Submit ===========
  const onSubmit = async (data: {
    UserLogin: string;
    UserPassword: string;
  }) => {
    setLoginError("");
    setIsLoading(true);
    const loginRequest = provideLoginRequest(data);
    const loginResponse = await fetch(loginRequest);
    const loginBody = await loginResponse.json();

    if (!loginResponse.ok || !loginBody?.Success) {
      setIsLoading(false);
      setLoginError(
        loginBody.Message ||
          "Something unexpected happens, please contact our support team! code: L0001"
      );

      return;
    }

    setIsLoading(false);
    const { TokenRefresh, TokenAccess } = loginBody;
    console.log(TokenAccess);
    await setTokenCookie(TokenAccess, TokenRefresh);
    router.reload();
    // try {
    // 	fetch(loginRequest)
    // 		.then((res) => {
    // 			if(!res.ok){
    // 				return;
    // 			}
    // 			return res.json()
    // 		})
    // 		.then((data) => {
    // 			if(!data){
    // 				setLoginError("Wrong email or password. Please try again.");
    //         return;
    // 			}

    // 			await setTokenCookie(data.accessToken, data.refreshToken)

    // 			setIsLoading(false);
    // 		});
    // } catch (error) {
    // 	console.log(error);
    // 	setLoginError(error as string);
    // 	setIsLoading(false);
    // }

    return;
  };
  // ======== End Form Submit ===========

  // async function testget() {
  //   const gg = fetch("/api/access", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   return;
  // }

  useEffect(() => {
    if (authLoading === undefined) {
      return;
    }
    if (token) {
      router.push("/device");
      // console.log("token ada");
    }
  }, [token, router]);

  return (
    <Bacground title={"Welcome"}>
      <div className="flex flex-col gap-4 px-4 mt-4">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-sm space-y-5"
          >
            <NewInput
              id="UserLogin"
              disabled={isLoading}
              label=""
              validation={{ required: "Username must be filled" }}
              placeholder="Enter your username"
            />

            <PasswordInput
              id="UserPassword"
              label=""
              disabled={isLoading}
              validation={{
                required: "Password must be filled",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters!",
                },
              }}
              placeholder="Enter your password"
            />
            {loginError && <p className="text-red-500">{loginError}</p>}
            <Button
              buttonname={"Login"}
              style={"w-full"}
              onClick={handleSubmit(onSubmit)}
              isLoading={isLoading}
            />
          </form>
        </FormProvider>
      </div>
    </Bacground>
  );
}

Login.authenticate = true;
