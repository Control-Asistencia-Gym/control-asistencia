import { FC, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import { gymApi } from "../../apis";
import { DataPagination, IUser, ListUserResponse } from "../../interfaces";
import { UIContext } from "../ui";
import { UsersContext, usersReducer } from "./";

export interface UsersState {
  users: IUser[];
  user?: IUser;
  dataPagination: DataPagination;
}

interface Props {
  children: React.ReactNode;
}

const USERS_INITIAL_STATE: UsersState = {
  users: [],
  user: undefined,
  dataPagination: {
    next_page: null,
    total: 0,
    page: 1,
    per_page: 10,
    pre_page: null,
    total_pages: 0,
  },
};

const NUMBERPAGE = 10;

export const UsersProvider: FC<Props> = ({ children }) => {
  const {
    closeModal,
    startLoading,
    stopLoading,
    startLoadingModal,
    stopLoadingModal,
  } = useContext(UIContext);
  const [state, dispatch] = useReducer(usersReducer, USERS_INITIAL_STATE);

  const getUsers = async (page: number = 1) => {
    startLoading();
    try {
      const response = await gymApi.get<ListUserResponse>("/list_users", {
        params: { page, per_page: NUMBERPAGE },
      });
      dispatch({
        type: "[users] - get-data",
        payload: response.data?.data?.data,
      });
      const { data, ...dataPagination } = response.data?.data;
      dispatch({
        type: "[users] - data - pagination",
        payload: dataPagination,
      });
    } catch (error: any) {
      toast.error("Hubo un error al obtener usuarios", {
        duration: 5000,
      });
    } finally {
      stopLoading();
    }
  };

  const searhhUser = async (value: string = "") => {
    try {
      const response = await gymApi.get<ListUserResponse>(`/list_users`, {
        params: { q: value, per_page: NUMBERPAGE },
      });
      dispatch({
        type: "[users] - searh-user",
        payload: response.data?.data?.data,
      });
      const { data, ...dataPagination } = response.data?.data;
      dispatch({
        type: "[users] - data - pagination",
        payload: dataPagination,
      });
    } catch (error: any) {
      toast.error(error.response.data.message || "Usuario no encontrado");
    }
  };

  const sendUser = async (user: IUser) => {
    startLoadingModal();
    try {
      const { data } = await gymApi.post("/user_create", user);

      if (data.success) {
        toast.success(data.message, {
          duration: 5000,
        });
        getUsers(1);
        closeModal();
        editUser(undefined);
      }
    } catch (error: any) {
      toast.error("Algo salio mal, intentelo de nuevo");
    } finally {
      stopLoadingModal();
    }
  };

  const updateUser = async (user: IUser) => {
    startLoadingModal();
    try {
      const { data } = await gymApi.put(`/update_user`, user);

      if (data.success) {
        toast.success(data.message, {
          duration: 5000,
        });
        getUsers(1);
        closeModal();
        editUser(undefined);
      }
    } catch (error: any) {
      toast.error("Algo salio mal, intentelo de nuevo");
    } finally {
      stopLoadingModal();
    }
  };

  const editUser = (user?: IUser) => {
    dispatch({ type: "[users] - edit-user", payload: user });
  };

  return (
    <UsersContext.Provider
      value={{ ...state, sendUser, searhhUser, getUsers, updateUser, editUser }}
    >
      {children}
    </UsersContext.Provider>
  );
};
