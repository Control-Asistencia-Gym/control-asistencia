import React from "react";
import { Modal, Button, Text, Input, Row, Col } from "@nextui-org/react";
import {
  AiOutlineUserAdd,
  AiOutlineUser,
  AiOutlineIdcard,
} from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";

export const ModalUser = () => {
  const [visible, setVisible] = React.useState(false);

  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <div>
      <Button auto icon={<AiOutlineUserAdd size={20} />} onClick={handler}>
        Agregar usuario
      </Button>
      <Modal
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width="600px"
      >
        <Modal.Header>
          <Text id="modal-title" b size={18}>
            Agregar usuario
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Row gap={1}>
            <Col span={12}>
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Nombre completo"
                contentLeft={<AiOutlineUser />}
              />
            </Col>
          </Row>
          <Row gap={1}>
            <Col span={6}>
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                type="number"
                placeholder="Cedula de identidad"
                contentLeft={<AiOutlineIdcard />}
              />
            </Col>
            <Col span={6}>
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                type="number"
                placeholder="Numero de celular"
                contentLeft={<BsTelephone />}
              />
            </Col>
          </Row>
          <Row gap={1}>
            <Col span={6}>
              <Input
                bordered
                fullWidth
                color="primary"
                size="lg"
                type="date"
                placeholder="Fecha Desde"
              />
            </Col>
            <Col span={6}>
              <Input
                bordered
                fullWidth
                color="primary"
                size="lg"
                type="date"
                placeholder="Fecha Hasta"
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Cancelar
          </Button>
          <Button auto onClick={closeHandler}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
