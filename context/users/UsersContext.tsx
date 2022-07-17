import { createContext } from "react";
import { IUser } from "../../interfaces";

interface ContextProps {
    users: IUser[];
}

export const UsersContext = createContext({} as ContextProps);
