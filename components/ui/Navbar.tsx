import { Avatar, Container, Spacer, Text, useTheme } from "@nextui-org/react";

export const Navbar = () => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        minHeight: '60px',
        padding: '0 20px',
        backgroundColor: theme?.colors.gray100.value,
      }}
    >
      <Text color="#000">LOGO</Text>
      <Spacer css={{ flex: 1 }} />
      <Avatar text="Primary" color="primary" textColor="white" />
    </div>
  );
};
