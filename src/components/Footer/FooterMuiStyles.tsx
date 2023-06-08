import { AppBar } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  // position: "absolute",
  position: "fixed",
  top: "auto",
  bottom: 0,

  "& .MuiPagination-root .Mui-selected": {
    backgroundColor: "black",
    color: "#fff",
  },
  "& .MuiBox-root": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
}));
