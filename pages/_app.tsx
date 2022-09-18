import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { UsersProvider } from "../context/users";
import { UIProvider } from "../context/ui";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UIProvider>
        <Toaster />
        <UsersProvider>
          <NextUIProvider>
            <Component {...pageProps} />
          </NextUIProvider>
        </UsersProvider>
      </UIProvider>
    </AuthProvider>
  );
}

export default MyApp;
