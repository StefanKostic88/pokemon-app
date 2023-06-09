import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

export const BoxStyled = styled(Paper)(({ theme }) => ({
  width: "fit-content",
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
  padding: theme.mixins.toolbar.minHeight,
  margin: "0 auto",
  sm: theme.breakpoints.keys[1],
  "& .MuiStack-root": {
    alignItems: "center",
    justifyContent: "center",
    "& .MuiTypography-root": {
      textAlign: "center",
    },
  },
}));
