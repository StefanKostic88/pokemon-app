import { CardsContainer } from "../../components";
import { useContext } from "react";

import { AppContext } from "../../store/app-context";
import { Typography } from "@mui/material";

const HomePage = () => {
  const { characterArr, getCharacterDetails, bookmarkCharacter, searchError } =
    useContext(AppContext);
  return (
    <>
      {!searchError ? (
        <CardsContainer
          cardArr={characterArr}
          onGetCharacterDeatials={getCharacterDetails}
          onBookmarkPokemon={bookmarkCharacter}
        />
      ) : (
        <Typography
          variant="h4"
          style={{ margin: "200px auto", width: "fit-content" }}
        >
          No characters found
        </Typography>
      )}
    </>
  );
};

export default HomePage;
