import {
  CharacterNames,
  PokemonDetails,
  PokemonDetailsInput,
  PokemonPageDetailsInput,
  PokemonInfoPageInterface,
  FetchInputData,
} from "../Utils/interfaces";
import PokemonPageInfoModel from "../Models/pokemonePageInfoModel";

const getPokemonDatails = async (pokeName: CharacterNames) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
    // const res = await fetch(`https://pokeapme}`);

    if (!res.ok) throw new Error(res.statusText);
    const {
      name,
      id,
      sprites: { front_default: img },
    }: PokemonDetailsInput = await res.json();

    const pokemonData: PokemonDetails = {
      name,
      id,
      img,
      isBookmarked: false,
    };

    return pokemonData;
  } catch (error) {
    throw error;
  }
};

export const getCharacters = async (
  curPage: number = 1,
  limit: number = 24
) => {
  const curentPage = (curPage - 1) * 24;

  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${curentPage}&limit=${limit}`
    );
    // const res = await fetch("https:/4");
    if (!res.ok) throw new Error();

    const { count, results } = await res.json();

    const newData: PokemonDetails[] = results
      .map(({ name }: CharacterNames) => {
        return name;
      })
      .map((el: CharacterNames) => {
        return getPokemonDatails(el);
      });

    const maxPages = Math.ceil(count / limit);

    return { newData, maxPages };
  } catch (error) {
    throw error;
  }
};

export const getPokemonPageInfo = async (pokemonId: string | undefined) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    // const res = await fetch(`https://pokeapme}`);

    if (!res.ok) throw new Error(res.statusText);
    const {
      name,
      abilities,
      types,
      forms,
      sprites: { front_default: img },
      stats,
      id,
      base_experience,
      height,
    }: PokemonPageDetailsInput = await res.json();

    // const data = await res.json();
    // console.log(data);

    const pokemonInfoPageObj: PokemonInfoPageInterface =
      new PokemonPageInfoModel(
        name,
        img,
        id,
        abilities,
        types,
        forms,
        stats,
        base_experience,
        height
      ).generateInfo;

    return pokemonInfoPageObj;
  } catch (error) {
    throw error;
  }
};

export const getSearchData = async (
  searchTearm: string,
  filterVal: "Default" | "A-Z" | "Z-A",
  curPage: number = 1
) => {
  try {
    const curentPage = (curPage - 1) * 24;
    const limit = curentPage + 24;

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
    if (!res.ok) throw new Error(res.statusText);

    const { results, count }: { results: { name: string }[]; count: number } =
      await res.json();

    let allPokemons = results.map(({ name }: { name: string }) => name);

    const searhLower = searchTearm.toLocaleLowerCase();

    if (filterVal === "A-Z") {
      allPokemons.sort((a, b) => a.localeCompare(b));
    }
    if (filterVal === "Z-A") {
      allPokemons.sort((a, b) => b.localeCompare(a));
    }

    const filteredPockemons = allPokemons
      .filter((name: string) => {
        const nameLower = name.toLowerCase();
        return nameLower.includes(searhLower);
      })
      .map((name: string) => {
        return { name: name };
      });

    const newData = filteredPockemons
      .slice(curentPage, limit)
      .map(({ name }: { name: any }) => {
        return getPokemonDatails(name);
      });
    const curMaxPage =
      Math.ceil(count / allPokemons.length) === count
        ? 1
        : Math.ceil(count / allPokemons.length);

    const maxPages = isFinite(curMaxPage) ? curMaxPage : 1;
    if (newData.length === 0) throw new Error();

    return { newData, maxPages };
  } catch (error) {
    throw error;
  }
};
