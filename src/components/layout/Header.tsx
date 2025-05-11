import {
  Grid,
  PaletteMode,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  useColorScheme,
} from "@mui/material";
import { MouseEvent } from "react";
import { NavLink } from "react-router";
import { Bedtime, Sunny } from "@mui/icons-material";
import { getThemeColor } from "../../themes/theme";

export default function Header() {
  const { mode, systemMode, setMode } = useColorScheme();

  const toggleMode = mode === "system" ? systemMode : mode;

  function handleChange(_e: MouseEvent<HTMLElement>, value: string | null) {
    if (value !== null) {
      setMode(value as PaletteMode);
    }
  }

  return (
    <Grid
      alignItems="center"
      columnSpacing={4}
      container
      justifyContent="space-evenly"
      mb={2}
      py={1}
      sx={{
        backgroundColor: (theme) => getThemeColor(theme, "headerBackground"),
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Grid>
        <TitleLink to="/">TV Show Tracker</TitleLink>
      </Grid>
      <Grid>
        <PageLink to="/table">Table View</PageLink>
      </Grid>
      <Grid>
        <PageLink to="/split-view">Split View</PageLink>
      </Grid>
      <Grid>
        <ToggleButtonGroup exclusive onChange={handleChange} value={toggleMode}>
          <ToggleButton aria-label="light" size="small" value="light">
            <Sunny />
          </ToggleButton>
          <ToggleButton aria-label="dark" size="small" value="dark">
            <Bedtime />
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
}

const BaseLink = styled(NavLink)`
  color: inherit;
  background-color: inherit;
  padding: 8px;
  border-radius: 8px;
  text-decoration: none;
  &:hover {
    color: inherit;
    background-color: ${({ theme }) => getThemeColor(theme, "linkHover")};
  }
`;

const TitleLink = styled(BaseLink)`
  font-size: 24px;
`;

const PageLink = styled(BaseLink)`
  font-size: 18px;
`;
