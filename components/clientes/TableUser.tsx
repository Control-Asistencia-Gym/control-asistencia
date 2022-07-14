import { Key } from "react";
import { Table, Row, Col, Tooltip, Text } from "@nextui-org/react";
import { EyeIcon, IconButton, StyledBadge, DeleteIcon, EditIcon } from "../ui";

type UserType = {
  id: string | number;
  name?: string;
  cedula?: string;
  date?: string;
  time?: string;
  tel?: string;
  status: "activo" | "vencido";
};

export const TableUser = () => {
  const columns = [
    { name: "NOMBRE", uid: "name" },
    { name: "CEDULA", uid: "cedula" },
    { name: "FECHA INICIO - FIN", uid: "date" },
    { name: "HORARIO", uid: "time" },
    { name: "CELULAR", uid: "tel" },
    { name: "CUOTA", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const users: UserType[] = [
    {
      id: 1,
      name: "Tony Reichert",
      cedula: "4.234.234",
      date: "01/01/2022 - 01/02/2022 ",
      time: "8:00 - 9:00",
      tel: "981 234234",
      status: "activo",
    },
    {
      id: 2,
      name: "Zoey Lang",
      status: "activo",
    },
    {
      id: 3,
      name: "Jane Fisher",
      status: "vencido",
    },
    {
      id: 4,
      name: "William Howard",
      status: "vencido",
    },
    {
      id: 5,
      name: "Kristen Copper",
      status: "activo",
    },
    {
      id: 6,
      name: "Tony Reichert",
      status: "activo",
    },
    {
      id: 7,
      name: "Zoey Lang",
      status: "vencido",
    },
    {
      id: 8,
      name: "Jane Fisher",
      status: "activo",
    },
    {
      id: 9,
      name: "William Howard",
      status: "vencido",
    },
    {
      id: 10,
      name: "Kristen Copper",
      status: "vencido",
    },
  ];

  const renderCell = (user: UserType, columnKey: Key) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <Text b size={14} css={{ tt: "capitalize" }}>
            {cellValue}
          </Text>
        );
      case "role":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );
      case "status":
        return <StyledBadge type={user?.status}>{cellValue}</StyledBadge>;

      case "actions":
        return (
          <Row justify="center" align="center">
            {/* <Col css={{ d: "flex" }}>
              <Tooltip content="Información">
                <IconButton onClick={() => console.log("View user", user?.id)}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col> */}
            <Col css={{ d: "flex" }}>
              <Tooltip content="Editar">
                <IconButton onClick={() => console.log("Editar", user?.id)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Borrar"
                color="error"
                onClick={() => console.log("Borrar", user?.id)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  return (
    <Table
      aria-label="tabla usuarios"
      css={{
        height: "calc(100vh - 11rem)",
        minWidth: "100%",
      }}
      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={users}>
        {(item: UserType) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
      <Table.Pagination
        color="gradient"
        shadow
        noMargin
        align="center"
        rowsPerPage={10}
        onPageChange={(page) => console.log({ page })}
      />
    </Table>
  );
};
