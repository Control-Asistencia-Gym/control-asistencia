import { UIState } from "./";

type UIActionType =
  | { type: "[UI] - Open Modal"; payload: boolean }
  | { type: "[UI] - Close Modal" }
  | { type: "[UI] - start loading user" }
  | { type: "[UI] - stop loading user" }
  | { type: "[UI] - start loading Modaluser" }
  | { type: "[UI] - stop loading Modaluser" };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "[UI] - Open Modal":
      return {
        ...state,
        isModalOpen: true,
        isModalEdit: action.payload,
      };

    case "[UI] - Close Modal":
      return {
        ...state,
        isModalOpen: false,
        isModalEdit: false,
      };

    case "[UI] - start loading user":
      return {
        ...state,
        isLoadingUser: true,
      };

    case "[UI] - stop loading user":
      return {
        ...state,
        isLoadingUser: false,
      };

    case "[UI] - start loading Modaluser":
      return {
        ...state,
        isLoadingModalUser: true,
      };

    case "[UI] - stop loading Modaluser":
      return {
        ...state,
        isLoadingModalUser: false,
      };

    default:
      return state;
  }
};
