import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "../interfaces";

const userSchema = new Schema(
  {
    nombre: { type: String, trim: true, required: true },
    apellido: { type: String, required: true },
    cedula: { type: Number, required: true },
    telefono: { type: String, required: true },
    fechaInicial: { type: Date, required: true },
    fechaFinal: { type: Date, required: true },
    horarioInicial: { type: Date, required: true },
    horarioFinal: { type: Date, required: true },
    estado: { type: Boolean, default: true},
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
