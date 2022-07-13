import type { NextPage } from "next";
import { Button, Col, Row, Spacer, Text } from "@nextui-org/react";
import { Layout } from "../components/layouts";
import { TableUser } from "../components/clientes";
import { ModalUser } from "../components/ui";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Spacer y={1} />
      <Row>
        <Col span={6}>
          <Text h3>Lista de usuarios</Text>
        </Col>
        <Col span={6} css={{ display: "flex", justifyContent: "right" }}>
          {/* <Button icon={<AiOutlineUserAdd size={20} />} flat>
            Nuevo
          </Button> */}
          <ModalUser />
        </Col>
      </Row>
      <Spacer y={1} />
      <div>
        <TableUser />
      </div>
    </Layout>
  );
};

export default HomePage;
