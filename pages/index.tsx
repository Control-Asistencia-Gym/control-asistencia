import type { NextPage } from "next";
import { Col, Input, Row, Spacer, Text } from "@nextui-org/react";
import { Layout } from "../components/layouts";
import { TableUser } from "../components/clientes";
import { IconButton, ModalUser } from "../components/ui";
import { BsSearch } from "react-icons/bs";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Spacer y={1} />
      <Row>
        <Col span={4}>
          <Text h3>Lista de usuarios</Text>
        </Col>
        <Col span={4} css={{ display: "flex", justifyContent: "center" }}>
          <Input
            placeholder="Buscar usuario"
            clearable
            contentLeft={
              <IconButton onClick={() => console.log("click")}>
                <BsSearch />
              </IconButton>
            }
          />
        </Col>
        <Col span={4} css={{ display: "flex", justifyContent: "right" }}>
          <ModalUser />
        </Col>
      </Row>
      <Spacer y={1} />
      <TableUser />
    </Layout>
  );
};

export default HomePage;
