import React, { useContext } from "react";
import {
  Modal,
  Button,
  Text,
  Input,
  Row,
  Col,
  Spacer,
  Loading,
} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineUser, AiOutlineIdcard } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { UIContext } from "../../context/ui";
import { UsersContext } from "../../context/users";
import { User, IUser } from "../../interfaces";

export const ModalUser = (): JSX.Element => {
  const { isModalOpen, isModalEdit, isLoadingModalUser, closeModal } =
    useContext(UIContext);
  const { sendUser, updateUser, editUser, user } = useContext(UsersContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      _id: user?._id,
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
      documentNumber: user?.document_number || "",
      phoneNumber: user?.phone_number || "",
      fromDate: user?.from_date || undefined,
      toDate: user?.to_date || undefined,
      fromHour: user?.from_hour || "",
      toHour: user?.to_hour || "",
    },
  });

  const onSubmit: SubmitHandler<User> = async (data) => {
    const body: IUser = {
      _id: isModalEdit ? data?._id : undefined,
      first_name: data?.firstName,
      last_name: data?.lastName,
      document_number: data?.documentNumber,
      phone_number: data?.phoneNumber,
      from_date: data?.fromDate,
      to_date: data?.toDate,
      from_hour: data?.fromHour,
      to_hour: data?.toHour,
    };

    if (isModalEdit) {
      updateUser(body);
    } else {
      sendUser(body);
    }
  };

  const onCloseModal = () => {
    closeModal();
    editUser(undefined);
  };

  return (
    <Modal preventClose open={isModalOpen} onClose={onCloseModal} width="600px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Text id="modal-title" b size={18}>
            {isModalEdit ? "Editar usuario" : "Agregar Usuario"}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Row gap={1}>
            <Col span={6}>
              <Input
                clearable
                aria-label="nombre"
                helperText={errors.firstName?.message}
                helperColor="error"
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Nombre"
                contentLeft={<AiOutlineUser />}
                {...register("firstName", {
                  required: "Nombre no puede estar vacío",
                  minLength: {
                    value: 3,
                    message: "debe tener al menos 3 caracteres",
                  },
                })}
              />
            </Col>
            <Col span={6}>
              <Input
                clearable
                aria-label="apellido"
                helperText={errors.lastName?.message}
                helperColor="error"
                bordered
                fullWidth
                color="primary"
                size="lg"
                contentLeft={<AiOutlineUser />}
                placeholder="Apellido"
                {...register("lastName", {
                  required: "Apellido no puede estar vacío",
                  minLength: {
                    value: 3,
                    message: "debe tener al menos 3 caracteres",
                  },
                })}
              />
            </Col>
          </Row>
          <Spacer y={0.1} />
          <Row gap={1}>
            <Col span={6}>
              <Input
                clearable
                aria-label="CI"
                helperText={errors.documentNumber?.message}
                helperColor="error"
                bordered
                fullWidth
                color="primary"
                size="lg"
                type="number"
                placeholder="Cedula de identidad"
                contentLeft={<AiOutlineIdcard />}
                {...register("documentNumber", {
                  required: "Cedula no puede estar vacío",
                  maxLength: { value: 7, message: "Maximo 8 caracteres" },
                })}
              />
            </Col>
            <Col span={6}>
              <Input
                clearable
                aria-label="Numero de celular"
                helperText={errors.phoneNumber?.message}
                helperColor="error"
                bordered
                fullWidth
                color="primary"
                size="lg"
                type="number"
                placeholder="Numero de celular"
                contentLeft={<BsTelephone />}
                {...register("phoneNumber", {
                  maxLength: { value: 10, message: "Maximo 10 caracteres" },
                })}
              />
            </Col>
          </Row>
          <Spacer y={0.1} />
          <Row gap={1}>
            <Col span={6}>
              <Input
                bordered
                aria-label="Fecha desde"
                helperText={errors.fromDate?.message}
                helperColor="error"
                fullWidth
                color="primary"
                size="lg"
                type="date"
                placeholder="Fecha Desde"
                {...register("fromDate", {
                  required: "Fecha desde, no puede estar vacío",
                })}
              />
            </Col>
            <Col span={6}>
              <Input
                bordered
                aria-label="Fecha hasta"
                helperText={errors.toDate?.message}
                helperColor="error"
                fullWidth
                color="primary"
                size="lg"
                type="date"
                placeholder="Fecha Hasta"
                {...register("toDate", {
                  required: "Fecha hasta, no puede estar vacío",
                  // valueAsDate: true,
                })}
              />
            </Col>
          </Row>
          <Spacer y={0.1} />
          <Row gap={1}>
            <Col span={6}>
              <Input
                bordered
                aria-label="Hora desde"
                helperText={errors.fromHour?.message}
                helperColor="error"
                fullWidth
                color="primary"
                size="lg"
                type="time"
                placeholder="Hora desde"
                {...register("fromHour", {
                  required: "Hora desde, no puede estar vacío",
                })}
              />
            </Col>
            <Col span={6}>
              <Input
                bordered
                aria-label="Hora hasta"
                helperText={errors.toHour?.message}
                helperColor="error"
                fullWidth
                color="primary"
                size="lg"
                type="time"
                placeholder="Hora hasta"
                {...register("toHour", {
                  required: "Hora hasta, no puede estar vacío",
                })}
              />
            </Col>
          </Row>
          <Spacer y={0.1} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            disabled={isLoadingModalUser}
            flat
            color="error"
            onClick={onCloseModal}
          >
            Cancelar
          </Button>
          <Button
            auto
            disabled={isLoadingModalUser}
            color="gradient"
            type="submit"
          >
            Aceptar
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
