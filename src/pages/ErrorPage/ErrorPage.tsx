import { styled } from "@mui/material/styles";
import Wraper from "../../components/UI/Wraper/Wraper";
import { Typography, Stack, Button, Paper } from "@mui/material";

import { useContext } from "react";
import { AppContext } from "../../store/app-context";
import { useLocation, useNavigate } from "react-router";

export const BoxStyled = styled(Paper)(({ theme }) => ({
  width: "fit-content",
  background: theme.palette.error.main,
  color: theme.palette.error.contrastText,
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
    "& .MuiButtonBase-root": {
      color: theme.palette.error.main,
      background: theme.palette.error.contrastText,
    },
  },
}));

const ErrorPage = () => {
  const { resetPage } = useContext(AppContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isInvalidPathName = pathname !== "/";

  return (
    <Wraper>
      <BoxStyled>
        <Stack spacing={2}>
          <Typography variant="h3">404 Error</Typography>
          <Typography variant="h5">Somthing went wrong</Typography>
          <Button
            variant="outlined"
            onClick={
              !isInvalidPathName
                ? () => {
                    resetPage();
                  }
                : () => {
                    navigate("/");
                  }
            }
          >
            Go Back
          </Button>
        </Stack>
      </BoxStyled>
    </Wraper>
  );
};

export default ErrorPage;
