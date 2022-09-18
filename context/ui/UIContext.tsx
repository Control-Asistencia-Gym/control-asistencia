import { createContext } from "react";

interface ContextProps {
  isModalOpen: boolean;
  isModalEdit: boolean;
  isLoadingUser: boolean;
  isLoadingModalUser: boolean;

  //methods
  openModal: (isEdit: boolean) => void;
  closeModal: () => void;
  startLoading: () => void;
  stopLoading: () => void;
  startLoadingModal: () => void;
  stopLoadingModal: () => void;
}

export const UIContext = createContext({} as ContextProps);
