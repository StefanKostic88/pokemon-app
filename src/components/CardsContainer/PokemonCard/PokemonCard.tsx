import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { FC } from "react";
import { PokemonDetails } from "../../../services/Utils/interfaces";

import noImage from "../../../assets/images/no-image.png";

type Props = {
  characterCardData: PokemonDetails;
  onGetCharacterDeatials: (id: number) => void;
  onBookmarkPokemon: (id: number) => void;
};

const PokemonCard: FC<Props> = ({
  characterCardData: { name, img, id, isBookmarked },
  onGetCharacterDeatials,
  onBookmarkPokemon,
}) => {
  return (
    <Card>
      <CardMedia
        sx={{ height: 300 }}
        image={img ? img : noImage}
        title={name}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textAlign="center"
        >
          {`${name.at(0)?.toUpperCase()}${name.slice(1)}`}
        </Typography>
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={() => {
            // console.log(id);
            onGetCharacterDeatials(id);
          }}
        >
          More
        </Button>
        <Button
          variant={isBookmarked ? "contained" : "outlined"}
          onClick={() => {
            onBookmarkPokemon(id);
          }}
        >
          Save
        </Button>
      </CardActions>
    </Card>
  );
};

export default PokemonCard;
