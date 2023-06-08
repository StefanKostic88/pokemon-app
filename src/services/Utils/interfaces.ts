export interface CharacterNames {
  name: string;
}

export interface PokemonDetailsInput {
  name: string;
  id: number;
  sprites: { front_default: string | null };
}

export interface PokemonDetails {
  name: string;
  id: number;
  img: string | null;
  isBookmarked?: boolean;
}

export interface PokemonPageDetailsInput extends PokemonDetailsInput {
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  forms: { name: string }[];
  stats: { base_stat: number; stat: { name: string } }[];
  base_experience: number;
  height: number;
}

export interface PokemonInfoPageInterface extends PokemonDetails {
  abilities: string[];
  types: string[];
  forms: string[];
  stats: { statName: string; statValue: number }[];
  exp: number;
  height: number;
}

export type TableDataInput = {
  statsArr: { statName: string; statValue: number }[];
  typesArr: string[];
  abilitiesArr: string[];
  formsArr: string[];
};

export interface TableDataObj {
  stats: { statName: string; statValue: number } | null;
  types: string | null;
  abilities: string | null;
  forms: string | null;
  id: number;
}

export interface FetchInputData {
  count: number;
  results: { name: string; url: string }[];
}
