import { createContext, FC, useState } from "react";

export type ModalContentType = {
  id: string;
  header: string;
  description: string;
  mediaSrc: string;
  mediaType: string;
  date: string;
};

type spaceContext = {
  favorites: ModalContentType[];
  modalState: boolean;
  modalContent: ModalContentType;
  addToFavorite: (id: ModalContentType) => void;
  removeFromFavorite: (id: ModalContentType) => void;
  setModalState: (state: boolean) => void;
  fillModalContent: (content: ModalContentType) => void;
};

const defaultSpaceValues: spaceContext = {
  favorites: [],
  modalState: false,
  modalContent: {
    id: "",
    header: "",
    description: "",
    mediaSrc: "",
    mediaType: "",
    date: "",
  },
  addToFavorite: () => {},
  removeFromFavorite: () => {},
  setModalState: () => {},
  fillModalContent: () => {},
};

export const SpaceContext = createContext<spaceContext>(defaultSpaceValues);

export const SpaceContextProvider: FC = ({ children }) => {
  const [favorites, setFavorites] = useState<ModalContentType[]>(
    defaultSpaceValues.favorites
  );
  const [modalState, setmodalState] = useState<boolean>(
    defaultSpaceValues.modalState
  );
  const [modalContent, setmodalContent] = useState(
    defaultSpaceValues.modalContent
  );

  const addToFavorite = (fave: ModalContentType) => {
    const oldFaves = localStorage.getItem("nasaFaves");

    if (oldFaves) {
      setFavorites([...JSON.parse(oldFaves), fave]);
      localStorage.setItem(
        "nasaFaves",
        JSON.stringify([...JSON.parse(oldFaves), fave])
      );
    } else {
      setFavorites([fave]);
      localStorage.setItem("nasaFaves", JSON.stringify([fave]));
    }
  };
  const removeFromFavorite = (fave: ModalContentType) => {
    const newFavorites = favorites.filter(f => f.id !== fave.id);
    setFavorites(newFavorites);
    localStorage.setItem("nasaFaves", JSON.stringify(newFavorites));
  };
  const setModalState = (id: boolean) => setmodalState(id);
  const fillModalContent = (content: ModalContentType) =>
    setmodalContent(content);

  return (
    <SpaceContext.Provider
      value={{
        favorites,
        modalState,
        modalContent,
        addToFavorite,
        removeFromFavorite,
        setModalState,
        fillModalContent,
      }}>
      {children}
    </SpaceContext.Provider>
  );
};
