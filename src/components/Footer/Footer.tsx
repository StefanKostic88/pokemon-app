import { AppContext } from "../../store/app-context";
import { useContext } from "react";
import { StyledAppBar } from "./FooterMuiStyles";
import { Pagination, Toolbar, Box } from "@mui/material";
import { useParams, useLocation } from "react-router";

const Footer = () => {
  const { curPage, pageChangeHandler, lastPage } = useContext(AppContext);
  const { pathname } = useLocation();
  const { id: paramId } = useParams();

  const notValidPatth = pathname === `/pokemon/${paramId}`;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar>
        <Toolbar>
          <Box>
            {!notValidPatth && (
              <Pagination
                count={lastPage}
                page={curPage}
                variant="outlined"
                shape="rounded"
                boundaryCount={0}
                siblingCount={1}
                onChange={(_, val) => {
                  pageChangeHandler(val);
                }}
                showFirstButton
                showLastButton
              />
            )}
          </Box>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};

export default Footer;
