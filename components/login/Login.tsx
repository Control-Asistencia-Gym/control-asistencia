import React, { useContext } from "react";
import { Button, Spacer, Container, Input, Row, Text } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Mail, Password } from "../ui";
import { AuthContext } from "../../context/auth";
import { validation } from "../../utils";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { loginUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) =>
    await loginUser(email, password);

  return (
    <form onSubmit={handleSubmit(onLoginUser)}>
      <Container style={{ marginTop: "180px" }}>
        <Row justify="center">
          <Text h2>Iniciar sesión</Text>
        </Row>
        <Spacer y={1} />
        <Row justify="center">
          <Input
            aria-label="correo"
            clearable
            width="350px"
            helperColor="error"
            bordered
            color="primary"
            size="lg"
            placeholder="Correo"
            contentLeft={<Mail fill="currentColor" />}
            helperText={errors.email?.message}
            {...register("email", {
              required: "*Correo es obligatorio",
              validate: validation.isEmail,
            })}
          />
        </Row>
        <Spacer y={1.5} />
        <Row justify="center">
          <Input.Password
            aria-label="contraseña"
            width="350px"
            helperColor="error"
            bordered
            color="primary"
            size="lg"
            placeholder="Contraseña"
            contentLeft={<Password fill="currentColor" />}
            helperText={errors.password?.message}
            {...register("password", {
              required: "*Contraseña es obligario",
            })}
          />
        </Row>
        <Spacer y={1.5} />
        <Row justify="center">
          <Button auto color="gradient" type="submit">
            Ingresar
          </Button>
        </Row>
      </Container>
    </form>
  );
};

export default Login;
