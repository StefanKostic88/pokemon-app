import { TableDataInput, TableDataObj } from "./interfaces";
import { PokemonDetails } from "./interfaces";
export const generateTableData = (
  statsArr: TableDataInput["statsArr"],
  typesArr: TableDataInput["typesArr"],
  abilitiesArr: TableDataInput["abilitiesArr"],
  formsArr: TableDataInput["formsArr"]
) => {
  const maxEl = [
    statsArr.length,
    typesArr.length,
    abilitiesArr.length,
    formsArr.length,
  ].reduce((acc, el) => {
    acc = acc < el ? el : acc;
    return acc;
  }, 0);

  const dataArr: TableDataObj[] = [];

  for (let i = 0; i < maxEl; i++) {
    const testData: TableDataObj = {
      stats: statsArr[i] ? statsArr[i] : null,
      types: typesArr[i] ? typesArr[i] : null,
      abilities: abilitiesArr[i] ? abilitiesArr[i] : null,
      forms: formsArr[i] ? formsArr[i] : null,
      id: i,
    };
    dataArr.push(testData);
  }
  return dataArr;
};

export const getBookmarks = () => {
  const bookmarkData = localStorage.getItem("savedPokemons");
  const data: PokemonDetails[] | null = bookmarkData
    ? JSON.parse(bookmarkData)
    : null;
  return data;
};

export const checkAndUpdateBookmarkedStatus = (
  arr: PokemonDetails[],
  bookArr: PokemonDetails[] | null
) => {
  if (!bookArr) return arr;
  const data = [...arr];
  if (bookArr.length === 0) return data;
  data.forEach((el, index) => {
    bookArr.forEach((el1, index1) => {
      if (el1.id === el.id) {
        data[index] = bookArr[index1];
      }
    });
  });

  return data;
};

export const updateBookmark = (
  arr: PokemonDetails[],
  newCard: PokemonDetails | undefined,
  id: number | undefined
) => {
  const data: PokemonDetails[] = [...arr];
  const findCard = data.find((el) => el.id === id);

  if (findCard) {
    const findCardIndex = data.indexOf(findCard);
    if (newCard) {
      if (newCard.isBookmarked) {
        //ADD TO BOOKMARK
        data.push(newCard);
      } else {
        //REMOVE FFROM BOOKMARK
        data.splice(findCardIndex, 1);
      }
    }
  }
  return data;
};
