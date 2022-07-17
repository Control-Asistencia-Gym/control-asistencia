import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IUser } from "../../../interfaces";
import { User } from "../../../models";

type Data = { message: string } | IUser;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: "El id no es válido " + id,
    });
  }

  switch (req.method) {
    case "PUT":
      return updateUser(req, res);

    default:
      res.status(400).json({ message: "Método no existe" });
  }
}

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
  const userToUpdate = await User.findById(id);

  if (!userToUpdate) {
    await db.disconnect();
    return res.status(400).json({
      message: "No hay entrada con ese ID",
    });
  }
  const {
    nombre = userToUpdate.nombre,
    apellido = userToUpdate.apellido,
    cedula = userToUpdate.cedula,
    telefono = userToUpdate.telefono,
    fechaInicial = userToUpdate.fechaInicial,
    fechaFinal = userToUpdate.fechaFinal,
    horarioInicial = userToUpdate.horarioInicial,
    horarioFinal = userToUpdate.horarioFinal,
    estado = userToUpdate.estado,
  } = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        nombre,
        apellido,
        cedula,
        telefono,
        fechaInicial,
        fechaFinal,
        horarioInicial,
        horarioFinal,
        estado,
      },
      {
        new: true,
      }
    );
    await db.disconnect();
    res.status(200).json(updateUser!);
  } catch (error: any) {
    await db.disconnect();
    return res.status(400).json({ message: error.errors.status.message });
  }
};
