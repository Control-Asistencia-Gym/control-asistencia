import { Key, useContext } from "react";
import { Table, Row, Col, Tooltip, Text } from "@nextui-org/react";
import { EyeIcon, IconButton, StyledBadge, DeleteIcon, EditIcon } from "../ui";
import { UsersContext } from "../../context/users";
import { IUser } from "../../interfaces";
import { numericos } from "../../utils";

const columns = [
  { name: "NOMBRE", uid: "nombre" },
  { name: "CEDULA", uid: "cedula" },
  { name: "FECHA INICIO - FIN", uid: "fecha" },
  { name: "HORARIO", uid: "horario" },
  { name: "CELULAR", uid: "telefono" },
  { name: "CUOTA", uid: "estado" },
  { name: "ACTIONS", uid: "actions" },
];

export const TableUser = () => {
  const { users } = useContext(UsersContext);

  // const users: UserType[] = [
  //   {
  //     id: 1,
  //     name: "Tony Reichert",
  //     cedula: "4.234.234",
  //     date: "01/01/2022 - 01/02/2022 ",
  //     time: "8:00 - 9:00",
  //     tel: "981 234234",
  //     status: "activo",
  //   },
  //   {
  //     id: 2,
  //     name: "Zoey Lang",
  //     status: "activo",
  //   },
  //   {
  //     id: 3,
  //     name: "Jane Fisher",
  //     status: "vencido",
  //   },
  //   {
  //     id: 4,
  //     name: "William Howard",
  //     status: "vencido",
  //   },
  //   {
  //     id: 5,
  //     name: "Kristen Copper",
  //     status: "activo",
  //   },
  //   {
  //     id: 6,
  //     name: "Tony Reichert",
  //     status: "activo",
  //   },
  //   {
  //     id: 7,
  //     name: "Zoey Lang",
  //     status: "vencido",
  //   },
  //   {
  //     id: 8,
  //     name: "Jane Fisher",
  //     status: "activo",
  //   },
  //   {
  //     id: 9,
  //     name: "William Howard",
  //     status: "vencido",
  //   },
  //   {
  //     id: 10,
  //     name: "Kristen Copper",
  //     status: "vencido",
  //   },
  // ];

  const renderCell = (user: IUser, columnKey: Key) => {
    const {
      nombre,
      apellido,
      cedula,
      telefono,
      fechaInicial,
      fechaFinal,
      horarioInicial,
      horarioFinal,
      estado,
      _id,
    } = user;
    const fechaInicio = new Date(fechaInicial).toLocaleDateString("py-PY");
    const fechaFin = new Date(fechaFinal).toLocaleDateString("py-PY");
    const horarioInicio = new Date(horarioInicial).toLocaleTimeString("py-PY");
    const horarioFin = new Date(horarioFinal).toLocaleTimeString("py-PY");
    const hora1 = horarioInicio.split(":");
    const hora2 = horarioFin.split(":");

    switch (columnKey) {
      case "nombre":
        return (
          <Text b css={{ tt: "capitalize" }}>
            {`${nombre} ${apellido}`}
          </Text>
        );

      case "cedula":
        return <Text>{numericos.formatoMiles(cedula)}</Text>;
      case "fecha":
        return <Text>{`${fechaInicio} - ${fechaFin}`}</Text>;

      case "horario":
        return (
          <Text>{`${hora1[0]}:${hora1[1]} - ${hora2[0]}:${hora2[1]}`}</Text>
        );

      case "estado":
        return (
          <StyledBadge type={estado ? "activo" : "vencido"}>
            {estado ? "activo" : "vencido"}
          </StyledBadge>
        );

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
                <IconButton onClick={() => console.log("Editar", _id)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Borrar"
                color="error"
                onClick={() => console.log("Borrar", _id)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return user[columnKey];
    }
  };

  return (
    <Table
      aria-label="tabla usuarios"
      css={{
        height: '580px'
      }}
      selectionMode="none"
      lined
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
        {(item: IUser) => (
          <Table.Row key={item._id}>
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
