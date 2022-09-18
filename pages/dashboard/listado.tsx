import { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import {
  Button,
  Col,
  Input,
  Loading,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { Layout } from "../../components/layouts";
import { TableUser } from "../../components/clientes";
import { IconButton, ModalUser } from "../../components/ui";
import { UIContext } from "../../context/ui";
import { UsersContext } from "../../context/users";

const Listado: NextPage = () => {
  const { searhhUser, getUsers } = useContext(UsersContext);
  const { openModal, isModalOpen, isLoadingUser } = useContext(UIContext);

  const [term, setTerm] = useState("");

  useEffect(() => {
    getUsers(1);
  }, []);

  const onSearhUser = () => {
    if (term.trim().length === 0) {
      getUsers(1);
    } else {
      searhhUser(term);
    }
  };

  return (
    <Layout>
      {isLoadingUser ? (
        <Loading
          size="lg"
          color="secondary"
          css={{
            display: "flex",
            zIndex: 999,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <>
          <Spacer y={1} />
          <Row>
            <Col span={4}>
              <Text h3>Lista de usuarios</Text>
            </Col>
            <Col span={4} css={{ display: "flex", justifyContent: "center" }}>
              <Input
                aria-label="buscar usuario"
                placeholder="Buscar usuario"
                clearable
                onChange={(e) => setTerm(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? onSearhUser() : null)}
                contentClickable={true}
                contentLeft={
                  <IconButton onClick={() => onSearhUser()}>
                    <BsSearch />
                  </IconButton>
                }
              />
            </Col>
            <Col span={4} css={{ display: "flex", justifyContent: "right" }}>
              <Button
                auto
                color="gradient"
                icon={<AiOutlineUserAdd size={20} />}
                onClick={() => openModal(false)}
              >
                Agregar usuario
              </Button>
            </Col>
          </Row>
          <Spacer y={1} />
          <div>
            <TableUser />
          </div>
          <div>{isModalOpen && <ModalUser />}</div>
        </>
      )}
    </Layout>
  );
};

export default Listado;
