import Wraper from "../UI/Wraper/Wraper";
import { Typography, Stack } from "@mui/material";

import { BoxStyled } from "./ErrorComponentStyles";

const ErrorComponent = () => {
  return (
    <Wraper>
      <BoxStyled>
        <Stack spacing={2}>
          <Typography variant="h4">No Pokemons Found</Typography>
          <Typography variant="h6">Sorry, try again</Typography>
        </Stack>
      </BoxStyled>
    </Wraper>
  );
};

export default ErrorComponent;
