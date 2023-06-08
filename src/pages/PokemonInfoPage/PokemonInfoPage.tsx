import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { getPokemonPageInfo } from "../../services/ApiServices/fetchData";
import {
  PokemonInfoPageInterface,
  TableDataObj,
} from "../../services/Utils/interfaces";
import { AppContext } from "../../store/app-context";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Stack,
  Paper,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
} from "@mui/material";

import Wraper from "../../components/UI/Wraper/Wraper";

import { generateTableData } from "../../services/Utils/helperFunctions";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

const PokemonInfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokeInfo, setPokeInfo] = useState<PokemonInfoPageInterface | null>(
    null
  );
  const [error, setError] = useState(false);
  const [tableData, seTtableData] = useState<TableDataObj[]>([]);

  const { setErrorHandler } = useContext(AppContext);

  useEffect(() => {
    const getData = async () => {
      try {
        setError(() => false);
        const data = await getPokemonPageInfo(id);

        setPokeInfo(() => data);

        const { stats, types, abilities, forms } = data;

        const tableData = generateTableData(stats, types, abilities, forms);
        seTtableData(() => [...tableData]);
      } catch (error) {
        setError(() => true);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (error) {
      navigate("/");
      const timer = setTimeout(() => {
        setErrorHandler();
        clearTimeout(timer);
      }, 100);
    }
  }, [error]);

  const profileImage: string | null | undefined = pokeInfo?.img;

  return (
    <Wraper>
      <Box>
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          flexWrap="wrap"
          marginBottom={3}
        >
          <Item>
            <img
              loading="lazy"
              src={profileImage ? profileImage : ""}
              alt={pokeInfo?.name}
              style={{
                height: 280,
                objectFit: "cover",
              }}
            />
          </Item>
          <Item>
            <Typography variant="h3" paddingTop={4} paddingBottom={2}>
              {pokeInfo?.name}
            </Typography>
            <Typography variant="h5" paddingBottom={1}>
              Exp: {pokeInfo?.exp}
            </Typography>
            <Typography variant="h5" paddingBottom={1}>
              Height: {pokeInfo?.height}
            </Typography>
          </Item>
        </Stack>

        <Stack>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>{pokeInfo?.name} Detials: </TableCell>
                  <TableCell align="right">Stats</TableCell>
                  <TableCell align="right">Types</TableCell>
                  <TableCell align="right">Abilities</TableCell>
                  <TableCell align="right">Forms</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map(({ stats, types, abilities, forms, id }) => (
                  <TableRow
                    key={id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {""}
                    </TableCell>
                    <TableCell align="right">
                      {stats?.statName} : {stats?.statValue}{" "}
                    </TableCell>
                    <TableCell align="right">{types}</TableCell>
                    <TableCell align="right">{abilities}</TableCell>
                    <TableCell align="right">{forms}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Box>
    </Wraper>
  );
};

export default PokemonInfoPage;
