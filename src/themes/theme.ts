import { createTheme, PaletteMode, Theme, ThemeOptions } from "@mui/material";

type ColorVariantTheme = {
  border: string;
  error: string;
  headerBackground: string;
  linkHover: string;
  spinner: string;
};

type ColorTheme = {
  [key in PaletteMode]: ColorVariantTheme;
};

const colorTheme: ColorTheme = {
  light: {
    border: "#555",
    error: "#cc2222",
    headerBackground: "#ccc",
    linkHover: "#aaa",
    spinner: "#555",
  },
  dark: {
    border: "#eee",
    error: "#ff7777",
    headerBackground: "#222",
    linkHover: "#555",
    spinner: "#eee",
  },
};

export function getThemeColor(theme: Theme, field: keyof ColorVariantTheme) {
  return colorTheme[theme.palette.mode][field];
}

function createBaseTheme(mode: PaletteMode): ThemeOptions {
  return {
    components: {
      MuiFormControl: {
        styleOverrides: {
          root: {
            width: "100%",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            height: "40px",
            backgroundColor: mode === "light" ? undefined : "#222",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            top: "-6px",
          },
          shrink: {
            top: 0,
          },
        },
      },
    },
  };
}

export const theme = createTheme({
  colorSchemes: {
    light: {
      ...createBaseTheme("light"),
      palette: {
        mode: "light",
        secondary: {
          main: "#ccc",
        },
      },
    },
    dark: {
      ...createBaseTheme("dark"),
      palette: {
        mode: "dark",
        background: {
          default: "#333",
        },
        secondary: {
          main: "#eee",
        },
      },
    },
  },
});
