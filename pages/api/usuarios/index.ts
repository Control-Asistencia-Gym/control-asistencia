import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IUser } from "../../../interfaces";
import { User } from "../../../models";

type Data = { message: string } | IUser[] | IUser;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getUsers(req, res);

    case "POST":
      return postUser(req, res);

    default:
      return res.status(400).json({ message: "Endpoint no existe" });
  }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { cedula = "all" } = req.query;
  let condition = {};

  if (cedula !== "all") {
    condition = { cedula };
  }
  await db.connect();
  const users = await User.find(condition).sort({ fechaFinal: "asc" });
  await db.disconnect();

  res.status(200).json(users);
};

const postUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {
    nombre,
    apellido,
    cedula,
    telefono,
    fechaInicial,
    fechaFinal,
    horarioInicial,
    horarioFinal,
  } = req.body;

  const newUser = new User({
    nombre,
    apellido,
    cedula,
    telefono,
    fechaInicial,
    fechaFinal,
    horarioInicial,
    horarioFinal,
    createAt: Date.now(),
  });

  try {
    await db.connect();
    await newUser.save();
    await db.disconnect();
    return res.status(201).json(newUser);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo salio mal, revisar consola del servidor" });
  }
};
