import { FC } from "react";
import Head from "next/head";
import { Navbar } from "../ui";
import { Container} from "@nextui-org/react";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Jumping Dance</title>
        <meta name="author" content="Gustavo Doldan" />
      </Head>
      <Navbar />
      <main>
        <Container css={{ height: "calc(100vh - 5.1rem)" }}>
          {children}
        </Container>
      </main>
    </>
  );
};
