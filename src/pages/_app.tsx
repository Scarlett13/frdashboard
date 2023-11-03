import AuthContext from "@/contexts/auth-context";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";

type NextPageWithLayout = NextPage & {
  authenticate?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const authProps = Component.authenticate;

  return Boolean(authProps) ? (
    <AuthContext>
      <Component {...pageProps} />
    </AuthContext>
  ) : (
    <Component {...pageProps} />
  );
}
