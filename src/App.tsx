import { Route, Routes } from "react-router";
import { RootPage, HomePage, PokemonInfoPage, ErrorPage } from "./pages";
import AppContextProvider from "./store/app-context";

import { useEffect, useState } from "react";

import { PokemonDetails } from "./services/Utils/interfaces";
import { getCharacters, getSearchData } from "./services/ApiServices/fetchData";
import { useNavigate } from "react-router";
import {
  checkAndUpdateBookmarkedStatus,
  updateBookmark,
  getBookmarks,
} from "./services/Utils/helperFunctions";

const App: React.FC = () => {
  const navigate = useNavigate();
  const [characterArr, setCharacterArr] = useState<PokemonDetails[] | null>(
    null
  );
  const [hasError, setHasError] = useState(false);
  const [curPage, setCurpage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [isSearched, setIsSearched] = useState(false);
  const [searchedPokemon, setSearchedPokemon] = useState("");
  const [filterValue, setFilterValue] = useState<"Default" | "A-Z" | "Z-A">(
    "Default"
  );

  const [searchError, setSearchError] = useState(false);

  //Render First Page and Reset

  const initHome = async () => {
    try {
      setSearchError(() => false);
      setFilterValue(() => "Default");
      setIsSearched(() => false);
      setHasError(() => false);
      const { newData, maxPages } = await getCharacters(curPage);
      const data = await Promise.all(newData);
      const bookmarkArr = getBookmarks();
      const mutatedData = checkAndUpdateBookmarkedStatus(data, bookmarkArr);

      setCharacterArr(() => [...mutatedData]);
      setLastPage(() => maxPages);
    } catch (error) {
      setCharacterArr(() => null);
      setHasError(() => true);
    }
  };

  //Load Cards and updates with bookmar array

  const compareCurArrAndUpdate = async (
    newData: Promise<PokemonDetails>[],
    maxPages: number
  ) => {
    const data = await Promise.all(newData);
    const bookmarkArr = getBookmarks();
    const mutatedData = checkAndUpdateBookmarkedStatus(data, bookmarkArr);
    setCharacterArr(() => [...mutatedData]);
    setLastPage(() => maxPages);
  };

  //Seters amd handlers

  const resetPage = () => {
    initHome();
    setCurpage(() => 1);
    setSearchError(() => false);
  };

  const pageChangeHandler = (page: number) => {
    setCurpage(() => page);
  };

  const getCharacterDetails = (pokemonId: number) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  const setErrorHandler = () => {
    setHasError(() => true);
  };

  const getSearchedTearm = async (searchTearm: string) => {
    try {
      setSearchError(() => false);
      setIsSearched(() => true);
      setCurpage(() => 1);
      setSearchedPokemon(() => searchTearm);
      const { newData, maxPages } = await getSearchData(
        searchTearm,
        filterValue
      );
      compareCurArrAndUpdate(newData, maxPages);
    } catch (error) {
      setCharacterArr(() => null);
      setSearchError(() => true);
    }
  };
  const controlFilter = (filterVal: "Default" | "A-Z" | "Z-A") => {
    setFilterValue(() => filterVal);
  };

  ///////Bookmark

  const bookmarkCharacter = (id: number) => {
    const data: PokemonDetails[] | null = getBookmarks();
    let bookmarkArr: PokemonDetails[] | null = data === null ? [] : [...data];
    let mutatedObj: PokemonDetails | undefined;
    const updatedArr: PokemonDetails[] | null = characterArr!.map((el) => {
      if (el.id === id) {
        mutatedObj = { ...el, isBookmarked: !el.isBookmarked };
        return mutatedObj;
      } else {
        return el;
      }
    });
    bookmarkArr = updateBookmark(updatedArr, mutatedObj, mutatedObj?.id);
    localStorage.setItem("savedPokemons", JSON.stringify(bookmarkArr));
    setCharacterArr(() => [...updatedArr]);
  };

  //Useeffects

  useEffect(() => {
    const getData = async () => {
      try {
        if (!isSearched) {
          initHome();
        } else {
          const { newData, maxPages } = await getSearchData(
            searchedPokemon,
            filterValue,
            curPage
          );
          compareCurArrAndUpdate(newData, maxPages);
        }
      } catch (error) {
        console.log(error);
        setCharacterArr(() => null);
        setHasError(() => true);
      }
    };
    getData();
  }, [curPage]);

  useEffect(() => {
    if (isSearched && searchedPokemon.length === 0) {
      resetPage();
    }
  }, [isSearched, searchedPokemon]);

  return (
    <AppContextProvider
      appValues={{
        characterArr,
        hasError,
        curPage,
        lastPage,
        pageChangeHandler,
        getCharacterDetails,
        setErrorHandler,
        getSearchedTearm,
        controlFilter,
        bookmarkCharacter,
        resetPage,
        searchError,
      }}
    >
      {!hasError ? (
        <Routes>
          <Route path="/" element={<RootPage />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/pokemon/:id" element={<PokemonInfoPage />}></Route>
          </Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      ) : (
        <ErrorPage />
      )}
    </AppContextProvider>
  );
};

export default App;
