import { FC, ReactNode, Fragment } from "react";
// import { styled } from "@mui/material/styles";
import { Grid, Paper } from "@mui/material";
import PokemonCard from "./PokemonCard/PokemonCard";
import Wraper from "../UI/Wraper/Wraper";

import { PokemonDetails } from "../../services/Utils/interfaces";

type Props = {
  children?: ReactNode;
  cardArr: PokemonDetails[] | null;
  onGetCharacterDeatials: (pokemonId: number) => void;
  onBookmarkPokemon: (id: number) => void;
};

const CardsContainer: FC<Props> = ({
  cardArr,
  onGetCharacterDeatials,
  onBookmarkPokemon,
}) => {
  // const Item = styled(Paper)(({ theme }) => ({
  //   // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   // ...theme.typography.body2,
  //   // padding: theme.spacing(1),
  //   // textAlign: "center",
  //   // color: theme.palette.text.secondary,
  // }));

  // const WraperStyled = styled(Container)(({ theme }) => ({
  //   backgroundColor: "red",
  //   maxWidth: "lg",
  //   // padding: "2rem 0",
  // }));

  return (
    <Wraper>
      <Grid container spacing={2}>
        {cardArr?.map((character) => {
          return (
            <Fragment key={character.id}>
              <Grid item xs={12} sm={6} md={4}>
                <Paper>
                  <PokemonCard
                    characterCardData={character}
                    onGetCharacterDeatials={onGetCharacterDeatials}
                    onBookmarkPokemon={onBookmarkPokemon}
                  />
                </Paper>
              </Grid>
            </Fragment>
          );
        })}
      </Grid>

      {/* <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <PokemonCard />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <PokemonCard />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <PokemonCard />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <PokemonCard />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <PokemonCard />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <PokemonCard />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <PokemonCard />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <PokemonCard />
          </Item>
        </Grid>
      </Grid> */}
    </Wraper>
  );
};

export default CardsContainer;
