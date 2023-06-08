import {
  FormControl,
  MenuItem,
  Select,
  Button,
  Typography,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";

import { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";

import { useState, ChangeEvent, useContext, FormEvent } from "react";
import { AppContext } from "../../store/app-context";

import { Search, SearchIconWrapper, StyledInputBase } from "./MainNavStyles";
import { useLocation, useParams, useNavigate } from "react-router";

const MainNav = () => {
  const { pathname } = useLocation();
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  const notValidPatth = pathname === `/pokemon/${paramId}`;

  const { getSearchedTearm, controlFilter, resetPage } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"Default" | "A-Z" | "Z-A">("Default");
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(() => e.target.value);
  };

  const onFilterChangeHandler = (event: SelectChangeEvent) => {
    const value = event.target.value as "Default" | "A-Z" | "Z-A";
    setFilter(() => value);

    controlFilter(value);
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim().length === 0 && search === "") return;
    getSearchedTearm(search);

    setSearch(() => "");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
            }}
            onClick={
              notValidPatth
                ? () => {
                    navigate("/");
                  }
                : () => {
                    resetPage();
                    setSearch(() => "");
                    setFilter(() => "Default");
                  }
            }
          >
            Pokemon
          </Typography>

          {!notValidPatth && (
            <form
              onSubmit={onSubmitHandler}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                margin: "8px 0 ",
                flexWrap: "wrap",
              }}
            >
              <FormControl>
                <Search>
                  <SearchIconWrapper>{<SearchIcon />}</SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onChange={onChangeHandler}
                    value={search}
                  />
                </Search>
              </FormControl>
              <Button variant="contained" type="submit">
                Search
              </Button>
              <FormControl sx={{ minWidth: 90 }}>
                <Select
                  variant="standard"
                  value={filter}
                  onChange={onFilterChangeHandler}
                  label="Age"
                >
                  <MenuItem value="Default">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"A-Z"}>A-Z</MenuItem>
                  <MenuItem value={"Z-A"}>Z-A</MenuItem>
                </Select>
              </FormControl>
            </form>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainNav;
