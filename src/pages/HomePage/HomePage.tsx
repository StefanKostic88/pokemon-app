import { CardsContainer, ErrorComponent } from "../../components";
import { useContext } from "react";
import { AppContext } from "../../store/app-context";

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
        <ErrorComponent />
      )}
    </>
  );
};

export default HomePage;
