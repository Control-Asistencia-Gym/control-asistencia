import { IUser } from "../../interfaces";
import { UsersState } from "./UsersProvider";

type UsersActionType = { type: "[users] - get-data"; payload: IUser[] };

export const usersReducer = (
  state: UsersState,
  action: UsersActionType
): UsersState => {
  switch (action.type) {
    case "[users] - get-data":
      return {
        ...state,
        users: [...action.payload],
      };
      break;

    default:
      return state;
  }
};
