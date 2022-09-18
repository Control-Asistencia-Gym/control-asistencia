import { createContext } from "react";
import { DataPagination, IUser } from "../../interfaces";

interface ContextProps {
  users: IUser[];
  user?: IUser;
  dataPagination: DataPagination;
  //Mrthods
  getUsers: (page?: number) => Promise<void>;
  sendUser: (user: IUser) => Promise<void>;
  searhhUser: (value?: string) => Promise<void>;
  updateUser: (user: IUser) => Promise<void>;
  editUser: (user?: IUser) => void;
}

export const UsersContext = createContext({} as ContextProps);
