import Image from "next/image";
import { Button, Spacer, useTheme } from "@nextui-org/react";
import logo from "../../public/logo.png";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";

export const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60px",
        padding: "0 20px",
        backgroundColor: theme?.colors.gray50.value,
      }}
    >
      <Image width={200} height={50} layout="fixed" src={logo} alt="LOGO" />
      <Spacer css={{ flex: 1 }} />
      <Button light color="primary" auto onClick={logout}>
        Cerrar sesión
      </Button>
    </div>
  );
};
