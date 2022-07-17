import { FC, useEffect, useReducer } from "react";
import { usersApi } from "../../apis";
import { IUser } from "../../interfaces";
import { UsersContext, usersReducer } from "./";

export interface UsersState {
  users: IUser[];
}

interface Props {
  children: React.ReactNode;
}

const USERS_INITIAL_STATE: UsersState = {
  users: [],
};

export const UsersProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, USERS_INITIAL_STATE);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const { data } = await usersApi.get<IUser[]>("/usuarios");
    dispatch({ type: "[users] - get-data", payload: data });
  };

  return (
    <UsersContext.Provider value={{ ...state }}>
      {children}
    </UsersContext.Provider>
  );
};
