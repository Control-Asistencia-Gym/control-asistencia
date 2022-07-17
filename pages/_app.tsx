import type { AppProps } from "next/app";
import { UsersProvider } from "../context/users";
import { NextUIProvider } from "@nextui-org/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UsersProvider>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </UsersProvider>
  );
}

export default MyApp;
