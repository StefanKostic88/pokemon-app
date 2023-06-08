import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";
// - ${theme.mixins.toolbar.minHeight}px
const WraperStyled = styled(Container)(({ theme }) => {
  return {
    maxWidth: theme.breakpoints.values.lg,
    minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px )`,
    marginTop: `${theme.mixins.toolbar.minHeight}px`,
    marginBottom: `${theme.mixins.toolbar.minHeight}px`,
    paddingTop: `${theme.mixins.toolbar.minHeight}px`,
    paddingBottom: `${theme.mixins.toolbar.minHeight}px`,
  };
});

type Props = {
  children: React.ReactNode;
};

const Wraper = ({ children }: Props) => {
  return <WraperStyled>{children}</WraperStyled>;
};

export default Wraper;
