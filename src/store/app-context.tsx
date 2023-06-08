import { ReactNode, FC, createContext } from "react";
import { PokemonDetails } from "../services/Utils/interfaces";

type Props = {
  children?: ReactNode;
  appValues: {
    characterArr: PokemonDetails[] | null;
    hasError: boolean;
    curPage: number;
    lastPage: number;
    pageChangeHandler: (page: number) => void;
    getCharacterDetails: (pokemonId: number) => void;
    setErrorHandler: () => void;
    getSearchedTearm: (searchTearm: string) => void;
    controlFilter: (filterVal: "Default" | "A-Z" | "Z-A") => void;
    bookmarkCharacter: (id: number) => void;
    resetPage: () => void;
    searchError: boolean;
  };
};
export type AppContextType = {
  characterArr: PokemonDetails[] | null;
  hasError: boolean;
  curPage: number;
  lastPage: number;
  pageChangeHandler: (page: number) => void;
  getCharacterDetails: (pokemonId: number) => void;
  setErrorHandler: () => void;
  getSearchedTearm: (searchTearm: string) => void;
  controlFilter: (filterVal: "Default" | "A-Z" | "Z-A") => void;
  bookmarkCharacter: (id: number) => void;
  resetPage: () => void;
  searchError: boolean;
};

export const AppContext = createContext<AppContextType>({
  characterArr: [],
  hasError: false,
  curPage: 1,
  pageChangeHandler: (page) => {},
  lastPage: 0,
  getCharacterDetails: (pokemonId) => {},
  setErrorHandler: () => {},
  getSearchedTearm: (searchTearm) => {},
  controlFilter: (filterVal) => {},
  bookmarkCharacter: (id) => {},
  resetPage: () => {},
  searchError: false,
});

const AppContextProvider: FC<Props> = ({ children, appValues }) => {
  const appContextObject: AppContextType = {
    characterArr: appValues.characterArr,
    hasError: appValues.hasError,
    curPage: appValues.curPage,
    lastPage: appValues.lastPage,
    pageChangeHandler: appValues.pageChangeHandler,
    getCharacterDetails: appValues.getCharacterDetails,
    setErrorHandler: appValues.setErrorHandler,
    getSearchedTearm: appValues.getSearchedTearm,
    controlFilter: appValues.controlFilter,
    bookmarkCharacter: appValues.bookmarkCharacter,
    resetPage: appValues.resetPage,
    searchError: appValues.searchError,
  };

  return (
    <AppContext.Provider value={appContextObject}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
