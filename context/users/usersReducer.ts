import { IUser, DataPagination } from "../../interfaces";
import { UsersState } from "./UsersProvider";

type UsersActionType =
  | { type: "[users] - get-data"; payload: IUser[] }
  | { type: "[users] - searh-user"; payload: IUser[] }
  | { type: "[users] - edit-user"; payload: IUser | undefined }
  | { type: "[users] - data - pagination"; payload: DataPagination };

export const usersReducer = (
  state: UsersState,
  action: UsersActionType
): UsersState => {
  switch (action.type) {
    case "[users] - get-data":
    case "[users] - searh-user":
      return {
        ...state,
        users: [...action.payload],
      };

    case "[users] - edit-user":
      return {
        ...state,
        user: action.payload,
      };

    case "[users] - data - pagination":
      return {
        ...state,
        dataPagination: action.payload,
      };
    default:
      return state;
  }
};
