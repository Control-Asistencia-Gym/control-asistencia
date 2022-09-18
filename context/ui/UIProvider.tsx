import { FC, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  isModalOpen: boolean;
  isLoadingUser: boolean;
  isModalEdit: boolean;
  isLoadingModalUser: boolean;
}

interface Props {
  children: React.ReactNode;
}

const UI_INITIAL_STATE: UIState = {
  isModalOpen: false,
  isModalEdit: false,
  isLoadingUser: false,
  isLoadingModalUser: false,
};

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openModal = (isEdit: boolean) => {
    dispatch({ type: "[UI] - Open Modal", payload: isEdit });
  };

  const closeModal = () => {
    dispatch({ type: "[UI] - Close Modal" });
  };

  const startLoading = () => {
    dispatch({ type: "[UI] - start loading user" });
  };

  const stopLoading = () => {
    dispatch({ type: "[UI] - stop loading user" });
  };

  const startLoadingModal = () => {
    dispatch({ type: "[UI] - start loading Modaluser" });
  };

  const stopLoadingModal = () => {
    dispatch({ type: "[UI] - stop loading Modaluser" });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        openModal,
        closeModal,
        startLoading,
        stopLoading,
        startLoadingModal,
        stopLoadingModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
