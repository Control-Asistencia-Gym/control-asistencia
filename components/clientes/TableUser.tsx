import { Key, useContext } from "react";
import { Table, Row, Col, Tooltip, Text } from "@nextui-org/react";
import { IconButton, StyledBadge, DeleteIcon, EditIcon } from "../ui";
import { IUser } from "../../interfaces";
import { numericos } from "../../utils";
import { UIContext } from "../../context/ui";
import { UsersContext } from "../../context/users";

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
  const { openModal } = useContext(UIContext);
  const { editUser, getUsers, users, dataPagination } =
    useContext(UsersContext);

  const renderCell = (user: IUser, columnKey: Key) => {
    const {
      _id,
      first_name,
      last_name,
      document_number,
      from_date,
      to_date,
      from_hour,
      to_hour,
      phone_number,
      state,
    } = user;
    const expiration = (value?: boolean) => (value ? "activo" : "vencido");
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "nombre":
        return (
          <Text b css={{ tt: "capitalize" }}>
            {`${first_name} ${last_name}`}
          </Text>
        );
      case "cedula":
        return <Text>{numericos.formatoMiles(parseInt(document_number))}</Text>;
      case "fecha":
        return (
          <Text>{`${numericos.formatDate(from_date)} - ${numericos.formatDate(
            to_date
          )}`}</Text>
        );

      case "horario":
        return <Text>{`${from_hour} - ${to_hour}`}</Text>;

      case "telefono":
        return <Text>{phone_number}</Text>;

      case "estado":
        return (
          <StyledBadge type={expiration(state)}>
            {expiration(state)}
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
                <IconButton
                  onClick={() => {
                    openModal(true);
                    editUser(user);
                  }}
                >
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
        return cellValue;
    }
  };

  return (
    <Table
      aria-label="tabla usuarios"
      css={{
        height: "580px",
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
          <Table.Row key={item?._id}>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
      <Table.Pagination
        color="gradient"
        total={dataPagination?.total_pages}
        page={dataPagination?.page}
        rowsPerPage={dataPagination?.per_page}
        shadow
        noMargin
        align="center"
        onPageChange={(page) => getUsers(page)}
      />
    </Table>
  );
};
