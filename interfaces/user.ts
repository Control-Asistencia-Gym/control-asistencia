export interface IUser {
  _id: string;
  nombre: string;
  apellido: string;
  cedula: number;
  fechaInicial: Date;
  fechaFinal: Date;
  horarioInicial: Date;
  horarioFinal: Date;
  telefono: string;
  estado: Boolean;
}
