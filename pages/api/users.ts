import type { NextApiRequest, NextApiResponse } from "next";
import { db, userData } from "../../database";
import { User } from "../../models";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({
      message: "No tiene acceso a este servicio",
    });
  }

  await db.connect();
  await User.deleteMany();
  await User.insertMany(userData.users);
  await db.disconnect();
  res.status(200).json({ message: "proceso realizado ok" });
}
