interface UserData {
  users: UserEntry[];
}
interface UserEntry {
  nombre: string;
  apellido: string;
  cedula: number;
  fechaInicial: Date;
  fechaFinal: Date;
  horarioInicial: Date;
  horarioFinal: Date;
  telefono: string;
  estado: boolean;
}
export const userData: UserData = {
  users: [
    {
      nombre: "Juan",
      apellido: "Perez",
      cedula: 4234234,
      fechaInicial: new Date(),
      fechaFinal: new Date(),
      horarioInicial: new Date(),
      horarioFinal: new Date(),
      telefono: "0981234234",
      estado: true,
    },
    {
      nombre: "Carlos",
      apellido: "Gonzalez",
      cedula: 4456456,
      fechaInicial: new Date("2022-01-05T00:00:00"),
      fechaFinal: new Date("2022-02-05T00:00:00"),
      horarioInicial: new Date("2022-01-05T15:00:00"),
      horarioFinal: new Date("2022-02-05T16:00:00"),
      telefono: "0981234234",
      estado: false,
    },
  ],
};
